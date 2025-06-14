import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { OrderStatus, ItemType } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generateSOCode } from '../libs/generate'

const prisma = new PrismaClient()

export const getAllSalesOrders = async (req: Request, res: Response): Promise<any> => {
    try {
        // Parse query parameters (validated by middleware)
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 25
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'desc'
        const status = req.query.status as OrderStatus | undefined

        // Build where condition for filtering
        const where: any = {}
        if (search) {
            where.OR = [
                { code: { contains: search } },
                { customerName: { contains: search } },
            ]
        }

        if (status) {
            where.status = status
        }

        // Build orderBy for sorting
        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        // Get total count for pagination
        const totalCount = await prisma.salesOrder.count({ where })

        // Calculate pagination values
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch sales orders with pagination
        const salesOrders = await prisma.salesOrder.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                spk: {
                    select: {
                        id: true,
                        code: true,
                        preprocessStatus: true,
                        processStatus: true,
                        finishingStatus: true,
                    },
                },
                pallets: {
                    select: {
                        id: true,
                        code: true,
                        status: true,
                    },
                },
            },
        })

        // Transform data for the response
        const formattedOrders = salesOrders.map((order) => ({
            ...order,
            itemsCount: order.items.length,
            spkCount: order.spk.length,
            palletCount: order.pallets.length,
            isComplete: order.status === 'COMPLETED',
        }))

        return res.json(
            successResponse(
                formattedOrders,
                'Sales orders retrieved successfully',
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
        console.error('Error in getAllSalesOrders:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve sales orders'))
    }
}

export const getSalesOrderById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                spk: {
                    include: {
                        phases: {
                            include: {
                                item: true,
                            },
                        },
                        report: true,
                    },
                },
                pallets: {
                    include: {
                        items: {
                            include: {
                                storageItem: {
                                    include: {
                                        item: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!salesOrder) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        // Calculate additional metrics
        const totalItemsOrdered = salesOrder.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
        )
        const totalItemsProduced = salesOrder.spk.reduce(
            (sum, spk) =>
                sum +
                spk.phases
                    .filter((phase) => phase.status === 'COMPLETED')
                    .reduce(
                        (phaseSum, phase) => phaseSum + phase.actualQuantity,
                        0,
                    ),
            0,
        )

        const totalItemsPacked = salesOrder.pallets.reduce(
            (sum, pallet) =>
                sum +
                pallet.items.reduce(
                    (palletSum, item) => palletSum + item.quantity,
                    0,
                ),
            0,
        )

        // Prepare statistics for response
        const statistics = {
            totalItemsOrdered,
            totalItemsProduced,
            totalItemsPacked,
            productionProgress:
                totalItemsOrdered > 0
                    ? Math.round((totalItemsProduced / totalItemsOrdered) * 100)
                    : 0,
            packingProgress:
                totalItemsOrdered > 0
                    ? Math.round((totalItemsPacked / totalItemsOrdered) * 100)
                    : 0,
        }

        return res.json(
            successResponse(
                {
                    ...salesOrder,
                    statistics,
                },
                'Sales order retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getSalesOrderById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve sales order'))
    }
}

export const createSalesOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            customerName,
            totalPrice,
            completionDate,
            deliveryDate,
            items,
        } = req.body

        const code = await generateSOCode()

        const existing = await prisma.salesOrder.findFirst({
            where: { code },
        })

        if (existing) {
            return res
                .status(400)
                .json(
                    errorResponse('Failed to generate unique sales order code'),
                )
        }

        if (items && items.length > 0) {
            const itemIds = items.map((item: any) => item.itemId)
            const foundItems = await prisma.item.findMany({
                where: { id: { in: itemIds } },
            })

            if (foundItems.length !== itemIds.length) {
                return res
                    .status(400)
                    .json(errorResponse('One or more items not found'))
            }

            const nonProductItems = foundItems.filter(
                (item) => item.type !== 'PRODUCT',
            )
            if (nonProductItems.length > 0) {
                return res.status(400).json(
                    errorResponse('Sales orders can only contain products', {
                        nonProductItems: nonProductItems.map((i) => i.name),
                    }),
                )
            }
            
            const itemsWithoutPrice = foundItems.filter(item => item.price === null)
            if (itemsWithoutPrice.length > 0) {
                return res.status(400).json(
                    errorResponse('All products must have prices', {
                        itemsWithoutPrice: itemsWithoutPrice.map(i => i.name),
                    }),
                )
            }
        }

        const newSalesOrder = await prisma.salesOrder.create({
            data: {
                customerName,
                totalPrice,
                code,
                completionDate: new Date(completionDate),
                deliveryDate: new Date(deliveryDate),
                items: {
                    create:
                        items?.map((item: any) => ({
                            item: { connect: { id: item.itemId } },
                            quantity: item.quantity,
                        })) || [],
                },
            },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        return res
            .status(201)
            .json(
                successResponse(
                    newSalesOrder,
                    'Sales order created successfully',
                ),
            )
    } catch (error) {
        console.error('Error in createSalesOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to create sales order'))
    }
}

export const updateSalesOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const {
            customerName,
            totalPrice,
            completionDate,
            deliveryDate,
            status,
        } = req.body

        // Check if sales order exists
        const existing = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                spk: true,
            },
        })

        if (!existing) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        // Check if sales order has production orders and is being completed
        if (status === 'COMPLETED' && existing.spk.length === 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot mark as completed without associated production orders',
                    ),
                )
        }

        // Update the sales order
        const updated = await prisma.salesOrder.update({
            where: { id },
            data: {
                customerName,
                totalPrice,
                completionDate: completionDate
                    ? new Date(completionDate)
                    : undefined,
                deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
                status: status as OrderStatus,
            },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        return res.json(
            successResponse(updated, 'Sales order updated successfully'),
        )
    } catch (error) {
        console.error('Error in updateSalesOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update sales order'))
    }
}

export const updateSalesOrderItems = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { items } = req.body

        const existing = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                items: true,
                spk: true,
            },
        })

        if (!existing) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        if (existing.spk.length > 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot update items when production orders exist',
                    ),
                )
        }

        if (items && items.length > 0) {
            const itemIds = items.map((item: any) => item.itemId)
            const foundItems = await prisma.item.findMany({
                where: { id: { in: itemIds } },
            })

            if (foundItems.length !== itemIds.length) {
                return res
                    .status(400)
                    .json(errorResponse('One or more items not found'))
            }

            const nonProductItems = foundItems.filter(
                (item) => item.type !== 'PRODUCT',
            )
            if (nonProductItems.length > 0) {
                return res.status(400).json(
                    errorResponse('Sales orders can only contain products', {
                        nonProductItems: nonProductItems.map((i) => i.name),
                    }),
                )
            }
            
            const itemsWithoutPrice = foundItems.filter(item => item.price === null)
            if (itemsWithoutPrice.length > 0) {
                return res.status(400).json(
                    errorResponse('All products must have prices', {
                        itemsWithoutPrice: itemsWithoutPrice.map(i => i.name),
                    }),
                )
            }
        }

        const result = await prisma.$transaction(async (tx) => {
            await tx.salesOrderItem.deleteMany({
                where: { salesOrderId: id },
            })

            const newItems = await Promise.all(
                items.map((item: any) =>
                    tx.salesOrderItem.create({
                        data: {
                            salesOrder: { connect: { id } },
                            item: { connect: { id: item.itemId } },
                            quantity: item.quantity,
                        },
                        include: {
                            item: true,
                        },
                    }),
                ),
            )

            return newItems
        })

        const updated = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        return res.json(
            successResponse(updated, 'Sales order items updated successfully'),
        )
    } catch (error) {
        console.error('Error in updateSalesOrderItems:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update sales order items'))
    }
}

export const deleteSalesOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        // Check if sales order exists
        const existing = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                spk: true,
                pallets: true,
            },
        })

        if (!existing) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        // Check for associated production orders or pallets
        if (existing.spk.length > 0) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete sales order with existing production orders',
                    {
                        productionOrders: existing.spk.map((spk) => ({
                            id: spk.id,
                            code: spk.code,
                        })),
                    },
                ),
            )
        }

        if (existing.pallets.length > 0) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete sales order with existing pallets',
                    {
                        pallets: existing.pallets.map((pallet) => ({
                            id: pallet.id,
                            code: pallet.code,
                        })),
                    },
                ),
            )
        }

        // Delete the sales order (items are deleted through cascade)
        await prisma.salesOrder.delete({ where: { id } })

        return res.json(
            successResponse(null, 'Sales order deleted successfully'),
        )
    } catch (error) {
        console.error('Error in deleteSalesOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to delete sales order'))
    }
}

export const getSalesOrderProgress = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id },
            include: {
                items: true,
                spk: {
                    include: {
                        phases: true,
                    },
                },
                pallets: {
                    include: {
                        items: true,
                    },
                },
            },
        })

        if (!salesOrder) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        // Calculate progress percentages
        const totalItemsOrdered = salesOrder.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
        )

        // Production progress
        const phases = salesOrder.spk.flatMap((spk) => spk.phases)
        const phaseProgress = {
            preprocess: {
                completed: phases.filter(
                    (p) => p.stage === 'PREPROCESS' && p.status === 'COMPLETED',
                ).length,
                total: phases.filter((p) => p.stage === 'PREPROCESS').length,
                percentage: 0,
            },
            process: {
                completed: phases.filter(
                    (p) => p.stage === 'PROCESS' && p.status === 'COMPLETED',
                ).length,
                total: phases.filter((p) => p.stage === 'PROCESS').length,
                percentage: 0,
            },
            finishing: {
                completed: phases.filter(
                    (p) => p.stage === 'FINISHING' && p.status === 'COMPLETED',
                ).length,
                total: phases.filter((p) => p.stage === 'FINISHING').length,
                percentage: 0,
            },
        }

        phaseProgress.preprocess.percentage =
            phaseProgress.preprocess.total > 0
                ? Math.round(
                      (phaseProgress.preprocess.completed /
                          phaseProgress.preprocess.total) *
                          100,
                  )
                : 0

        phaseProgress.process.percentage =
            phaseProgress.process.total > 0
                ? Math.round(
                      (phaseProgress.process.completed /
                          phaseProgress.process.total) *
                          100,
                  )
                : 0

        phaseProgress.finishing.percentage =
            phaseProgress.finishing.total > 0
                ? Math.round(
                      (phaseProgress.finishing.completed /
                          phaseProgress.finishing.total) *
                          100,
                  )
                : 0

        // Overall production progress
        const overallProductionProgress =
            (phaseProgress.preprocess.percentage +
                phaseProgress.process.percentage +
                phaseProgress.finishing.percentage) /
            3

        // Packing progress
        const itemsPacked = salesOrder.pallets.reduce(
            (sum, pallet) =>
                sum +
                pallet.items.reduce((pSum, item) => pSum + item.quantity, 0),
            0,
        )

        const packingProgress =
            totalItemsOrdered > 0
                ? Math.round((itemsPacked / totalItemsOrdered) * 100)
                : 0

        // Overall sales order progress
        const overallProgress = Math.round(
            overallProductionProgress * 0.7 + packingProgress * 0.3,
        )

        return res.json(
            successResponse(
                {
                    salesOrderId: salesOrder.id,
                    salesOrderCode: salesOrder.code,
                    currentStatus: salesOrder.status,
                    totalItemsOrdered,
                    productionProgress: {
                        overall: Math.round(overallProductionProgress),
                        phases: phaseProgress,
                    },
                    packingProgress,
                    overallProgress,
                    isComplete: salesOrder.status === 'COMPLETED',
                },
                'Sales order progress retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getSalesOrderProgress:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve sales order progress'))
    }
}

export default {
    getAllSalesOrders,
    getSalesOrderById,
    createSalesOrder,
    updateSalesOrder,
    updateSalesOrderItems,
    deleteSalesOrder,
    getSalesOrderProgress,
}
