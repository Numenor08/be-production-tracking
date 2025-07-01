import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { MutationType, ProcessStage } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

export const getAllStockMutations = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 50
        const search = req.query.search as string | undefined
        const type = req.query.type as MutationType | undefined
        const itemId = req.query.itemId as string | undefined
        const spkId = req.query.spkId as string | undefined
        const salesOrderId = req.query.salesOrderId as string | undefined
        const startDate = req.query.startDate as string | undefined
        const endDate = req.query.endDate as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'desc'

        const where: any = {}

        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { item: { name: { contains: search, mode: 'insensitive' } } },
                { item: { code: { contains: search, mode: 'insensitive' } } },
                { notes: { contains: search, mode: 'insensitive' } },
            ]
        }

        if (type) {
            where.type = type
        }

        if (itemId) {
            where.itemId = itemId
        }

        if (spkId) {
            where.spkId = spkId
        }

        if (salesOrderId) {
            where.salesOrderId = salesOrderId
        }

        if (startDate || endDate) {
            where.createdAt = {}
            if (startDate) {
                where.createdAt.gte = new Date(startDate)
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate)
            }
        }

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = sortOrder
        }

        const totalCount = await prisma.stockMutation.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const stockMutations = await prisma.stockMutation.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                item: {
                    select: {
                        id: true,
                        code: true,
                        name: true,
                        type: true,
                    },
                },
                storage: {
                    select: {
                        id: true,
                        spkStage: true,
                        spk: {
                            select: {
                                id: true,
                                code: true,
                            },
                        },
                    },
                },
                spk: {
                    select: {
                        id: true,
                        code: true,
                        salesOrder: {
                            select: {
                                id: true,
                                code: true,
                            },
                        },
                    },
                },
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                deliveryOrder: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                pallet: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                productionReport: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                performedByUser: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })

        return res.json(
            successResponse(
                stockMutations,
                'Stock mutations retrieved successfully',
                {
                    pagination: {
                        page,
                        limit,
                        totalItems: totalCount,
                        totalPages,
                    },
                },
            ),
        )
    } catch (error) {
        console.error('Error in getAllStockMutations:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve stock mutations'))
    }
}

export const getStockMutationById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const stockMutation = await prisma.stockMutation.findUnique({
            where: { id },
            include: {
                item: true,
                storage: {
                    include: {
                        spk: {
                            include: {
                                salesOrder: true,
                            },
                        },
                    },
                },
                spk: {
                    include: {
                        salesOrder: true,
                    },
                },
                salesOrder: {
                    include: {
                        customer: true,
                    },
                },
                deliveryOrder: {
                    include: {
                        salesOrder: {
                            include: {
                                customer: true,
                            },
                        },
                    },
                },
                pallet: {
                    include: {
                        salesOrder: true,
                        item: true,
                    },
                },
                productionReport: {
                    include: {
                        spkPhase: {
                            include: {
                                spk: {
                                    include: {
                                        salesOrder: true,
                                    },
                                },
                            },
                        },
                    },
                },
                performedByUser: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        })

        if (!stockMutation) {
            return res
                .status(404)
                .json(errorResponse('Stock mutation not found'))
        }

        return res.json(
            successResponse(
                stockMutation,
                'Stock mutation retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getStockMutationById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve stock mutation'))
    }
}

export const getStockMutationsByItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { itemId } = req.params
        const startDate = req.query.startDate as string | undefined
        const endDate = req.query.endDate as string | undefined

        const where: any = { itemId }

        if (startDate || endDate) {
            where.createdAt = {}
            if (startDate) {
                where.createdAt.gte = new Date(startDate)
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate)
            }
        }

        const mutations = await prisma.stockMutation.findMany({
            where,
            include: {
                item: {
                    select: {
                        id: true,
                        code: true,
                        name: true,
                        type: true,
                    },
                },
                storage: {
                    select: {
                        id: true,
                        spkStage: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        const summary = {
            totalAdditions: 0,
            totalReductions: 0,
            totalProductions: 0,
            totalDeliveries: 0,
            netChange: 0,
            mutationsByType: {} as Record<MutationType, number>,
        }

        mutations.forEach((mutation) => {
            const change = mutation.quantityChange
            const type = mutation.type

            summary.mutationsByType[type] =
                (summary.mutationsByType[type] || 0) + Math.abs(change)

            if (change > 0) {
                summary.totalAdditions += change
            } else {
                summary.totalReductions += Math.abs(change)
            }

            if (type === MutationType.PRODUCTION) {
                summary.totalProductions += Math.abs(change)
            } else if (type === MutationType.DELIVERY) {
                summary.totalDeliveries += Math.abs(change)
            }

            summary.netChange += change
        })

        return res.json(
            successResponse(
                {
                    mutations,
                    summary,
                },
                'Stock mutations by item retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getStockMutationsByItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve stock mutations by item'))
    }
}

export const getStockMutationsReport = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const startDate = req.query.startDate as string | undefined
        const endDate = req.query.endDate as string | undefined
        const groupBy = (req.query.groupBy as string) || 'day'

        const where: any = {}

        if (startDate || endDate) {
            where.createdAt = {}
            if (startDate) {
                where.createdAt.gte = new Date(startDate)
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate)
            }
        }

        const mutations = await prisma.stockMutation.findMany({
            where,
            include: {
                item: {
                    select: {
                        id: true,
                        code: true,
                        name: true,
                        type: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        const itemSummary: Record<
            string,
            {
                item: any
                totalAdditions: number
                totalReductions: number
                netChange: number
                mutationCount: number
                lastMutation: Date
            }
        > = {}

        const typeSummary: Record<
            MutationType,
            {
                count: number
                totalQuantity: number
                items: Set<string>
            }
        > = {} as any

        mutations.forEach((mutation) => {
            const itemId = mutation.itemId
            const change = mutation.quantityChange
            const type = mutation.type

            if (!itemSummary[itemId]) {
                itemSummary[itemId] = {
                    item: mutation.item,
                    totalAdditions: 0,
                    totalReductions: 0,
                    netChange: 0,
                    mutationCount: 0,
                    lastMutation: mutation.createdAt,
                }
            }

            const itemSum = itemSummary[itemId]
            if (change > 0) {
                itemSum.totalAdditions += change
            } else {
                itemSum.totalReductions += Math.abs(change)
            }
            itemSum.netChange += change
            itemSum.mutationCount += 1
            if (mutation.createdAt > itemSum.lastMutation) {
                itemSum.lastMutation = mutation.createdAt
            }

            if (!typeSummary[type]) {
                typeSummary[type] = {
                    count: 0,
                    totalQuantity: 0,
                    items: new Set(),
                }
            }
            typeSummary[type].count += 1
            typeSummary[type].totalQuantity += Math.abs(change)
            typeSummary[type].items.add(itemId)
        })

        const typeReport = Object.entries(typeSummary).map(([type, data]) => ({
            type,
            count: data.count,
            totalQuantity: data.totalQuantity,
            uniqueItems: data.items.size,
        }))

        const itemReport = Object.values(itemSummary)

        return res.json(
            successResponse(
                {
                    period: {
                        startDate,
                        endDate,
                        totalMutations: mutations.length,
                    },
                    byType: typeReport,
                    byItem: itemReport,
                    recentMutations: mutations.slice(0, 10),
                },
                'Stock mutations report retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getStockMutationsReport:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to generate stock mutations report'))
    }
}

export default {
    getAllStockMutations,
    getStockMutationById,
    getStockMutationsByItem,
    getStockMutationsReport,
}

