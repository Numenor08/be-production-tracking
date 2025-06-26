import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
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
                                customer: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
                reportItems: {
                    include: {
                        item: true,
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
                            select: {
                                id: true,
                                completionDate: true,
                            }
                        },
                        salesOrder: {
                            select: {
                                id: true,
                                code: true,
                                customer: {
                                    select: {
                                        name: true,
                                    },
                                },
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
            },
        })

        return res.json(successResponse(updated, 'Report updated successfully'))
    } catch (error) {
        console.error('Error in updateReport:', error)
        return res.status(500).json(errorResponse('Failed to update report'))
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
    updateReport,
    updateReportItem,
    deleteReportItem,
}
