import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generateDeliveryCode } from '../libs/generate'
import { DeliveryStatus, PalletStatus } from '../types/types'

const prisma = new PrismaClient()

// Get all delivery orders with pagination and filtering
export const getAllDeliveryOrders = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as string | undefined
        const status = req.query.status as DeliveryStatus | undefined

        // Build where condition for filtering
        const where: any = {}

        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { notes: { contains: search, mode: 'insensitive' } },
                { salesOrder: { code: { contains: search, mode: 'insensitive' } } },
                { salesOrder: { customer: { name: { contains: search, mode: 'insensitive' } } } },
            ]
        }

        if (status) {
            where.status = status
        }

        // Get total count for pagination
        const totalCount = await prisma.deliveryOrder.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch delivery orders with pagination and related data
        const deliveryOrders = await prisma.deliveryOrder.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                salesOrder: {
                    include: {
                        customer: {
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                phone: true,
                                contactPerson: true,
                            },
                        },
                        items: {
                            include: {
                                item: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                    },
                                },
                            },
                        },
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

        // Calculate totals for each delivery order
        const deliveryOrdersWithTotals = deliveryOrders.map((delivery) => {
            const totalPallets = delivery.pallets.length
            const totalItems = delivery.pallets.reduce(
                (sum: number, pallet: any) => {
                    return sum + pallet.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0)
                },
                0,
            )

            return {
                ...delivery,
                totalPallets,
                totalItems,
            }
        })

        return res.json(
            successResponse(
                deliveryOrdersWithTotals,
                'Delivery orders retrieved successfully',
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
        console.error('Error in getAllDeliveryOrders:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve delivery orders'))
    }
}

// Get delivery order by ID
export const getDeliveryOrderById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const deliveryOrder = await prisma.deliveryOrder.findUnique({
            where: { id },
            include: {
                salesOrder: {
                    include: {
                        customer: true,
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
                pallets: {
                    include: {
                        items: {
                            include: {
                                storageItem: {
                                    include: {
                                        item: true,
                                        spk: {
                                            select: {
                                                id: true,
                                                code: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!deliveryOrder) {
            return res
                .status(404)
                .json(errorResponse('Delivery order not found'))
        }

        // Calculate totals
        const totalPallets = deliveryOrder.pallets.length
        const totalItems = deliveryOrder.pallets.reduce(
            (sum: number, pallet: any) => {
                return sum + pallet.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0)
            },
            0,
        )

        const response = {
            ...deliveryOrder,
            totalPallets,
            totalItems,
        }

        return res.json(
            successResponse(response, 'Delivery order retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getDeliveryOrderById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve delivery order'))
    }
}

// Create new delivery order from completed sales order
export const createDeliveryOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { salesOrderId, deliveryDate, notes } = req.body

        // Check if sales order exists and is completed
        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id: salesOrderId },
            include: {
                pallets: {
                    where: {
                        status: PalletStatus.READY,
                    },
                },
                deliveryOrders: true,
            },
        })

        if (!salesOrder) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        if (salesOrder.status !== 'COMPLETED') {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Sales order must be completed to create delivery order',
                    ),
                )
        }

        if (salesOrder.deliveryOrders) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Delivery order already exists for this sales order',
                    ),
                )
        }

        if (salesOrder.pallets.length === 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'No ready pallets available for this sales order',
                    ),
                )
        }

        // Generate unique delivery order code
        const code = await generateDeliveryCode()

        // Create delivery order with transaction
        const deliveryOrder = await prisma.$transaction(async (tx) => {
            // Create delivery order
            const newDeliveryOrder = await tx.deliveryOrder.create({
                data: {
                    code,
                    deliveryDate: new Date(deliveryDate),
                    salesOrderId,
                    status: DeliveryStatus.PENDING,
                    notes,
                },
                include: {
                    salesOrder: {
                        include: {
                            customer: true,
                        },
                    },
                },
            })

            // Update all ready pallets to be assigned to this delivery order
            await tx.pallet.updateMany({
                where: {
                    salesOrderId,
                    status: PalletStatus.READY,
                },
                data: {
                    deliveryOrderId: newDeliveryOrder.id,
                },
            })

            return newDeliveryOrder
        })

        return res.status(201).json(
            successResponse(
                deliveryOrder,
                'Delivery order created successfully',
            ),
        )
    } catch (error) {
        console.error('Error in createDeliveryOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to create delivery order'))
    }
}

// Update delivery order status
export const updateDeliveryOrderStatus = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { status, notes } = req.body

        const deliveryOrder = await prisma.deliveryOrder.findUnique({
            where: { id },
            include: {
                pallets: true,
                salesOrder: true,
            },
        })

        if (!deliveryOrder) {
            return res
                .status(404)
                .json(errorResponse('Delivery order not found'))
        }

        // Use transaction to update delivery order and related data
        const updatedDeliveryOrder = await prisma.$transaction(async (tx) => {
            // Update delivery order
            const updated = await tx.deliveryOrder.update({
                where: { id },
                data: {
                    status,
                    notes,
                    updatedAt: new Date(),
                },
                include: {
                    salesOrder: {
                        include: {
                            customer: true,
                        },
                    },
                    pallets: true,
                },
            })

            // If status is DELIVERED, update pallets and sales order
            if (status === DeliveryStatus.DELIVERED) {
                // Update all pallets in this delivery to SHIPPED
                await tx.pallet.updateMany({
                    where: {
                        deliveryOrderId: id,
                    },
                    data: {
                        status: PalletStatus.SHIPPED,
                    },
                })

                // Update sales order status to DELIVERED
                await tx.salesOrder.update({
                    where: { id: deliveryOrder.salesOrderId },
                    data: {
                        status: 'DELIVERED',
                    },
                })
            }

            return updated
        })

        return res.json(
            successResponse(
                updatedDeliveryOrder,
                'Delivery order updated successfully',
            ),
        )
    } catch (error) {
        console.error('Error in updateDeliveryOrderStatus:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update delivery order'))
    }
}

// Update delivery order details
export const updateDeliveryOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { deliveryDate, notes } = req.body

        const deliveryOrder = await prisma.deliveryOrder.findUnique({
            where: { id },
        })

        if (!deliveryOrder) {
            return res
                .status(404)
                .json(errorResponse('Delivery order not found'))
        }

        if (deliveryOrder.status === DeliveryStatus.DELIVERED) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot update delivered delivery order',
                    ),
                )
        }

        const updatedDeliveryOrder = await prisma.deliveryOrder.update({
            where: { id },
            data: {
                deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
                notes,
                updatedAt: new Date(),
            },
            include: {
                salesOrder: {
                    include: {
                        customer: true,
                    },
                },
                pallets: {
                    include: {
                        items: true,
                    },
                },
            },
        })

        return res.json(
            successResponse(
                updatedDeliveryOrder,
                'Delivery order updated successfully',
            ),
        )
    } catch (error) {
        console.error('Error in updateDeliveryOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update delivery order'))
    }
}

// Delete delivery order (only if not delivered)
export const deleteDeliveryOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const deliveryOrder = await prisma.deliveryOrder.findUnique({
            where: { id },
            include: {
                pallets: true,
            },
        })

        if (!deliveryOrder) {
            return res
                .status(404)
                .json(errorResponse('Delivery order not found'))
        }

        if (deliveryOrder.status === DeliveryStatus.DELIVERED) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot delete delivered delivery order',
                    ),
                )
        }

        // Use transaction to delete delivery order and update pallets
        await prisma.$transaction(async (tx) => {
            // Remove delivery order assignment from pallets
            await tx.pallet.updateMany({
                where: {
                    deliveryOrderId: id,
                },
                data: {
                    deliveryOrderId: null,
                },
            })

            // Delete delivery order
            await tx.deliveryOrder.delete({
                where: { id },
            })
        })

        return res.json(
            successResponse(null, 'Delivery order deleted successfully'),
        )
    } catch (error) {
        console.error('Error in deleteDeliveryOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to delete delivery order'))
    }
}

// Start delivery (change status to IN_TRANSIT)
export const startDelivery = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const deliveryOrder = await prisma.deliveryOrder.findUnique({
            where: { id },
        })

        if (!deliveryOrder) {
            return res
                .status(404)
                .json(errorResponse('Delivery order not found'))
        }

        if (deliveryOrder.status !== DeliveryStatus.PENDING) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Can only start delivery for pending delivery orders',
                    ),
                )
        }

        const updatedDeliveryOrder = await prisma.deliveryOrder.update({
            where: { id },
            data: {
                status: DeliveryStatus.IN_TRANSIT,
                updatedAt: new Date(),
            },
            include: {
                salesOrder: {
                    include: {
                        customer: true,
                    },
                },
                pallets: {
                    include: {
                        items: true,
                    },
                },
            },
        })

        return res.json(
            successResponse(
                updatedDeliveryOrder,
                'Delivery started successfully',
            ),
        )
    } catch (error) {
        console.error('Error in startDelivery:', error)
        return res.status(500).json(errorResponse('Failed to start delivery'))
    }
}

export default {
    getAllDeliveryOrders,
    getDeliveryOrderById,
    createDeliveryOrder,
    updateDeliveryOrderStatus,
    updateDeliveryOrder,
    deleteDeliveryOrder,
    startDelivery,
}
