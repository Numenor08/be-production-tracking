import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import {
    ProcessStage,
    ProductionReport,
    ProductionReportTag,
    ItemType,
} from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generateReportCode } from '../libs/generate'
import { recordProductionMutation, recordReduceStockMutation } from '../utils/stockMutation.utils'

const prisma = new PrismaClient()

export async function createProductionReport(
    prisma: any,
    spkId: string,
    phaseId: string,
    spkItemId: string,
    stage: ProcessStage,
    actualQuantity: number,
    wasteQuantity: number,
    storageUsed: number,
    confirmedByUserId?: string,
    notes?: string,
    date: Date = new Date(),
    storageOperations?: {
        itemsAdded?: Array<{ itemId: string; storageId: string; quantity: number; quantityBefore: number }>
        itemsUsed?: Array<{ itemId: string; storageId: string; quantity: number; quantityBefore: number }>
    }
): Promise<ProductionReport> {
    const spkItem = await prisma.sPK_Item.findUnique({
        where: { id: spkItemId },
        select: {
            targetOutputQuantity: true,
            targetWaste: true,
        },
    })

    if (!spkItem) {
        throw new Error(`SPK item with ID ${spkItemId} not found`)
    }

    const reportCode = await generateReportCode(spkId, stage)

    const targetQuantity = spkItem.targetOutputQuantity
    const totalActual = actualQuantity + wasteQuantity
    const differenceToTarget = totalActual - targetQuantity

    const tags: ProductionReportTag[] = []

    if (storageUsed > 0) {
        tags.push(ProductionReportTag.STORAGE_USED)
    }

    if (wasteQuantity > 0 && actualQuantity < targetQuantity) {
        tags.push(ProductionReportTag.WASTE_USED)
    }

    const totalProduced = actualQuantity + wasteQuantity

    if (totalProduced < targetQuantity) {
        tags.push(ProductionReportTag.BELOW_TARGET)
    } else if (actualQuantity > targetQuantity) {
        tags.push(ProductionReportTag.ABOVE_TARGET)
    } else if (
        totalProduced === targetQuantity ||
        actualQuantity === targetQuantity
    ) {
        tags.push(ProductionReportTag.FULL_PLANNED)
    }

    if (stage === ProcessStage.FINISHING && actualQuantity > 0) {
        const spkItemWithOutput = await prisma.sPK_Item.findUnique({
            where: { id: spkItemId },
            include: {
                outputItem: {
                    select: {
                        type: true,
                    },
                },
            },
        })

        if (spkItemWithOutput?.outputItem?.type === ItemType.PRODUCT || 
            spkItemWithOutput?.outputItem?.type === ItemType.SEMI_FINISHED) {
            tags.push(ProductionReportTag.PALLET_CREATED)
        }
    }

    const productionReport = await prisma.productionReport.create({
        data: {
            code: reportCode,
            stage,
            spkPhase: {
                connect: { id: phaseId },
            },
            spkItem: {
                connect: { id: spkItemId },
            },
            confirmedByUser: confirmedByUserId
                ? {
                      connect: { id: confirmedByUserId },
                  }
                : undefined,
            confirmedDate: date,
            targetQuantity: targetQuantity,
            actualQuantity,
            wasteQuantity,
            totalStorageUsed: storageUsed,
            notes,
            tags: JSON.stringify(tags),
            differenceToTarget,
        },
    })

    if (storageOperations) {
        try {
            if (storageOperations.itemsAdded) {
                for (const item of storageOperations.itemsAdded) {
                    await recordProductionMutation(
                        prisma,
                        item.itemId,
                        item.storageId,
                        item.quantity,
                        item.quantityBefore,
                        {
                            spkId,
                            productionReportId: productionReport.id,
                            performedByUserId: confirmedByUserId,
                            notes: `Production output - ${notes || 'Production completed'}`,
                            stage,
                        }
                    )
                }
            }

            if (storageOperations.itemsUsed) {
                for (const item of storageOperations.itemsUsed) {
                    await recordReduceStockMutation(
                        prisma,
                        item.itemId,
                        item.storageId,
                        item.quantity,
                        item.quantityBefore,
                        {
                            spkId,
                            productionReportId: productionReport.id,
                            performedByUserId: confirmedByUserId,
                            notes: `Production input - ${notes || 'Materials used in production'}`,
                            stage,
                        }
                    )
                }
            }
        } catch (mutationError) {
            console.error('Error recording production stock mutations:', mutationError)
        }
    }

    return productionReport
}

export const getAllProductionReport = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 30
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'

        const where: any = {}
        if (search) {
            where.OR = [{ code: { contains: search, mode: 'insensitive' } }]
        }

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        const totalCount = await prisma.productionReport.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const report = await prisma.productionReport.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                spkPhase: {
                    select: {
                        id: true,
                        spk: {
                            select: {
                                code: true,
                            },
                        },
                    },
                },
                spkItem: {
                    select: {
                        outputItem: {
                            select: {
                                code: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        return res.status(200).json(
            successResponse(report, 'Production report fetched successfully', {
                pagination: {
                    page,
                    limit,
                    totalItem: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error fetching production report:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to fetch production report', error))
    }
}

export const getProductionReportById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const report = await prisma.productionReport.findUnique({
            where: { id },
            include: {
                spkPhase: {
                    include: {
                        spk: {
                            select: {
                                code: true,
                            },
                        },
                    },
                },
                spkItem: {
                    include: {
                        outputItem: {
                            select: {
                                code: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        if (!report) {
            return res
                .status(404)
                .json(errorResponse('Production report not found'))
        }

        return res
            .status(200)
            .json(
                successResponse(
                    report,
                    'Production report fetched successfully',
                ),
            )
    } catch (error) {
        console.error('Error fetching production report by ID:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to fetch production report', error))
    }
}

export default {
    getAllProductionReport,
    getProductionReportById,
}

