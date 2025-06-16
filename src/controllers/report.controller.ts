import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { ProcessStage, PhaseStatus } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

export const getAllReports = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as string | undefined

        // Build where condition for filtering
        const where: any = {}
        if (search) {
            where.OR = [
                { id: { contains: search } },
                { spk: { code: { contains: search } } },
            ]
        }

        const totalCount = await prisma.report.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const reports = await prisma.report.findMany({
            where,
            skip,
            take: limit,
            include: {
                spk: {
                    select: {
                        id: true,
                        code: true,
                        salesOrder: {
                            select: {
                                id: true,
                                code: true,
                                customerName: true,
                            },
                        },
                    },
                },
                reportItems: {
                    include: {
                        item: true,
                        storage: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return res.json(
            successResponse(reports, 'Reports retrieved successfully', {
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error in getAllReports:', error)
        return res.status(500).json(errorResponse('Failed to retrieve reports'))
    }
}

export const getReportById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const report = await prisma.report.findUnique({
            where: { id },
            include: {
                spk: {
                    include: {
                        phases: {
                            include: {
                                item: true,
                            },
                        },
                        salesOrder: {
                            select: {
                                id: true,
                                code: true,
                                customerName: true,
                            },
                        },
                    },
                },
                reportItems: {
                    include: {
                        item: true,
                        storage: true,
                    },
                },
            },
        })

        if (!report) {
            return res.status(404).json(errorResponse('Report not found'))
        }

        return res.json(
            successResponse(report, 'Report retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getReportById:', error)
        return res.status(500).json(errorResponse('Failed to retrieve report'))
    }
}

export const createReport = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { spkId } = req.body

        // Check if SPK exists
        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
            include: {
                report: true,
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        if (spk.report) {
            return res
                .status(400)
                .json(errorResponse('Report already exists for this SPK'))
        }

        // Create the report
        const report = await prisma.report.create({
            data: {
                spk: { connect: { id: spkId } },
            },
            include: {
                spk: true,
            },
        })

        return res
            .status(201)
            .json(successResponse(report, 'Report created successfully'))
    } catch (error) {
        console.error('Error in createReport:', error)
        return res.status(500).json(errorResponse('Failed to create report'))
    }
}

export const updateReport = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const {
            preprocessDetails,
            processDetails,
            finishingDetails,
            preprocessCompletionDate,
            processCompletionDate,
            finishingCompletionDate,
            preprocessSummary,
            processSummary,
            finishingSummary,
        } = req.body

        // Check if report exists
        const existingReport = await prisma.report.findUnique({
            where: { id },
        })

        if (!existingReport) {
            return res.status(404).json(errorResponse('Report not found'))
        }

        // Update the report
        const updated = await prisma.report.update({
            where: { id },
            data: {
                preprocessDetails,
                processDetails,
                finishingDetails,
                preprocessCompletionDate: preprocessCompletionDate
                    ? new Date(preprocessCompletionDate)
                    : undefined,
                processCompletionDate: processCompletionDate
                    ? new Date(processCompletionDate)
                    : undefined,
                finishingCompletionDate: finishingCompletionDate
                    ? new Date(finishingCompletionDate)
                    : undefined,
                preprocessSummary,
                processSummary,
                finishingSummary,
            },
        })

        return res.json(successResponse(updated, 'Report updated successfully'))
    } catch (error) {
        console.error('Error in updateReport:', error)
        return res.status(500).json(errorResponse('Failed to update report'))
    }
}

export const completePhase = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { phase, details, completionDate, summary, reportItems } =
            req.body

        // Validate phase value
        if (!Object.values(ProcessStage).includes(phase)) {
            return res.status(400).json(errorResponse('Invalid phase'))
        }

        // Begin transaction
        const result = await prisma.$transaction(async (tx) => {
            // Get report with SPK
            const report = await tx.report.findUnique({
                where: { id },
                include: {
                    spk: {
                        include: {
                            phases: {
                                where: { stage: phase },
                            },
                        },
                    },
                },
            })

            if (!report) {
                throw new Error('Report not found')
            }

            // Get the SPK phase data
            const spkPhase = report.spk.phases[0]
            if (!spkPhase) {
                throw new Error(`No ${phase} phase found for this SPK`)
            }

            // Update SPK phase status to completed
            await tx.sPK_Phase.update({
                where: {
                    id: spkPhase.id,
                },
                data: {
                    status: PhaseStatus.COMPLETED,
                    completionDate: new Date(),
                    actualQuantity: reportItems.reduce(
                        (sum: number, item: any) => sum + item.quantity,
                        0,
                    ),
                    actualWaste: reportItems.reduce(
                        (sum: number, item: any) => sum + item.wasteQuantity,
                        0,
                    ),
                },
            })

            // Update SPK status
            const spkUpdateData: any = {}
            switch (phase) {
                case ProcessStage.PREPROCESS:
                    spkUpdateData.preprocessStatus = PhaseStatus.COMPLETED
                    break
                case ProcessStage.PROCESS:
                    spkUpdateData.processStatus = PhaseStatus.COMPLETED
                    break
                case ProcessStage.FINISHING:
                    spkUpdateData.finishingStatus = PhaseStatus.COMPLETED
                    break
            }

            await tx.sPK.update({
                where: { id: report.spkId },
                data: spkUpdateData,
            })

            // Update Report
            const reportUpdateData: any = {}
            switch (phase) {
                case ProcessStage.PREPROCESS:
                    reportUpdateData.preprocessDetails = details
                    reportUpdateData.preprocessCompletionDate = new Date(
                        completionDate || Date.now(),
                    )
                    reportUpdateData.preprocessSummary = summary
                    break
                case ProcessStage.PROCESS:
                    reportUpdateData.processDetails = details
                    reportUpdateData.processCompletionDate = new Date(
                        completionDate || Date.now(),
                    )
                    reportUpdateData.processSummary = summary
                    break
                case ProcessStage.FINISHING:
                    reportUpdateData.finishingDetails = details
                    reportUpdateData.finishingCompletionDate = new Date(
                        completionDate || Date.now(),
                    )
                    reportUpdateData.finishingSummary = summary
                    break
            }

            const updatedReport = await tx.report.update({
                where: { id },
                data: reportUpdateData,
            })

            // Create report items and storage entries
            for (const item of reportItems) {
                // Create or update storage
                const storage = await tx.storage.upsert({
                    where: {
                        spkId_itemId_productionStage_isWaste: {
                            spkId: report.spkId,
                            itemId: item.itemId,
                            productionStage: phase,
                            isWaste: false,
                        },
                    },
                    create: {
                        spk: { connect: { id: report.spkId } },
                        item: { connect: { id: item.itemId } },
                        productionStage: phase,
                        stock: item.quantity,
                        wasteStock: item.wasteQuantity,
                        isWaste: false,
                    },
                    update: {
                        stock: { increment: item.quantity },
                        wasteStock: { increment: item.wasteQuantity },
                    },
                })

                // Create report item
                await tx.reportItem.create({
                    data: {
                        report: { connect: { id } },
                        item: { connect: { id: item.itemId } },
                        storage: { connect: { id: storage.id } },
                        phase: phase,
                        quantity: item.quantity,
                        wasteQuantity: item.wasteQuantity,
                        storageUsed: item.storageUsed || 0,
                        notes: item.notes,
                    },
                })
            }

            // Check if all phases are completed to mark the production order as complete
            const spk = await tx.sPK.findUnique({
                where: { id: report.spkId },
            })

            const allPhasesCompleted =
                spk?.preprocessStatus === PhaseStatus.COMPLETED &&
                spk?.processStatus === PhaseStatus.COMPLETED &&
                spk?.finishingStatus === PhaseStatus.COMPLETED

            // If all phases are completed, check the sales order status
            if (allPhasesCompleted) {
                // Check if all SPKs for the sales order are completed
                const salesOrder = await tx.salesOrder.findUnique({
                    where: { id: spk!.salesOrderId },
                    include: {
                        spk: true,
                    },
                })

                if (salesOrder) {
                    const allSpksCompleted = salesOrder.spk.every(
                        (s) =>
                            s.preprocessStatus === PhaseStatus.COMPLETED &&
                            s.processStatus === PhaseStatus.COMPLETED &&
                            s.finishingStatus === PhaseStatus.COMPLETED,
                    )

                    if (allSpksCompleted) {
                        await tx.salesOrder.update({
                            where: { id: salesOrder.id },
                            data: { status: 'COMPLETED' },
                        })
                    }
                }
            }

            return updatedReport
        })

        return res.json(
            successResponse(result, `Phase ${phase} completed successfully`),
        )
    } catch (error) {
        console.error('Error in completePhase:', error)
        return res
            .status(500)
            .json(
                errorResponse(
                    `Failed to complete phase: ${(error as Error).message}`,
                ),
            )
    }
}

export const addReportItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { reportId } = req.params
        const { itemId, phase, quantity, wasteQuantity, storageUsed, notes } =
            req.body

        // Check if report exists
        const report = await prisma.report.findUnique({
            where: { id: reportId },
            include: { spk: true },
        })

        if (!report) {
            return res.status(404).json(errorResponse('Report not found'))
        }

        // Check if item exists
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        // Create or get storage
        const storage = await prisma.storage.upsert({
            where: {
                spkId_itemId_productionStage_isWaste: {
                    spkId: report.spkId,
                    itemId: itemId,
                    productionStage: phase,
                    isWaste: false,
                },
            },
            create: {
                spk: { connect: { id: report.spkId } },
                item: { connect: { id: itemId } },
                productionStage: phase,
                stock: quantity,
                wasteStock: wasteQuantity || 0,
                isWaste: false,
            },
            update: {
                stock: { increment: quantity },
                wasteStock: { increment: wasteQuantity || 0 },
            },
        })

        // Create report item
        const reportItem = await prisma.reportItem.create({
            data: {
                report: { connect: { id: reportId } },
                item: { connect: { id: itemId } },
                storage: { connect: { id: storage.id } },
                phase,
                quantity,
                wasteQuantity: wasteQuantity || 0,
                storageUsed: storageUsed || 0,
                notes,
            },
            include: {
                item: true,
                storage: true,
            },
        })

        return res
            .status(201)
            .json(successResponse(reportItem, 'Report item added successfully'))
    } catch (error) {
        console.error('Error in addReportItem:', error)
        return res.status(500).json(errorResponse('Failed to add report item'))
    }
}

export const updateReportItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { itemId } = req.params
        const { quantity, wasteQuantity, storageUsed, notes } = req.body

        // Check if report item exists
        const existingItem = await prisma.reportItem.findUnique({
            where: { id: itemId },
            include: {
                storage: true,
            },
        })

        if (!existingItem) {
            return res.status(404).json(errorResponse('Report item not found'))
        }

        // Calculate quantity difference
        const quantityDiff = quantity - existingItem.quantity
        const wasteDiff = wasteQuantity - existingItem.wasteQuantity

        await prisma.$transaction(async (tx) => {
            // Update storage quantities if necessary
            if (
                existingItem.storageId &&
                (quantityDiff !== 0 || wasteDiff !== 0)
            ) {
                await tx.storage.update({
                    where: { id: existingItem.storageId },
                    data: {
                        stock: { increment: quantityDiff },
                        wasteStock: { increment: wasteDiff },
                    },
                })
            }

            // Update report item
            await tx.reportItem.update({
                where: { id: itemId },
                data: {
                    quantity,
                    wasteQuantity,
                    storageUsed: storageUsed || existingItem.storageUsed,
                    notes,
                },
            })
        })

        const updatedItem = await prisma.reportItem.findUnique({
            where: { id: itemId },
            include: {
                item: true,
                storage: true,
            },
        })

        return res.json(
            successResponse(updatedItem, 'Report item updated successfully'),
        )
    } catch (error) {
        console.error('Error in updateReportItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update report item'))
    }
}

export const deleteReportItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { itemId } = req.params

        // Check if report item exists
        const existingItem = await prisma.reportItem.findUnique({
            where: { id: itemId },
            include: {
                storage: true,
            },
        })

        if (!existingItem) {
            return res.status(404).json(errorResponse('Report item not found'))
        }

        await prisma.$transaction(async (tx) => {
            // Update storage quantities
            if (existingItem.storageId) {
                await tx.storage.update({
                    where: { id: existingItem.storageId },
                    data: {
                        stock: { decrement: existingItem.quantity },
                        wasteStock: { decrement: existingItem.wasteQuantity },
                    },
                })
            }

            // Delete report item
            await tx.reportItem.delete({
                where: { id: itemId },
            })
        })

        return res.json(
            successResponse(null, 'Report item deleted successfully'),
        )
    } catch (error) {
        console.error('Error in deleteReportItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to delete report item'))
    }
}

export default {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    completePhase,
    addReportItem,
    updateReportItem,
    deleteReportItem,
}
