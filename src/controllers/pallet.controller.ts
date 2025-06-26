import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { PalletStatus } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generatePalletCode } from '../libs/generate'

const prisma = new PrismaClient()

// Get all pallets with pagination and filtering
export const getAllPallets = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        // Parse query parameters
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as string | undefined
        const status = req.query.status as PalletStatus | undefined
        const salesOrderId = req.query.salesOrderId as string | undefined

        // Build where condition for filtering
        const where: any = {}

        if (search) {
            where.OR = [
                { code: { contains: search } },
                { salesOrder: { code: { contains: search } } },
                { salesOrder: { customerName: { contains: search } } },
            ]
        }

        if (status) {
            where.status = status
        }

        if (salesOrderId) {
            where.salesOrderId = salesOrderId
        }

        // Get total count for pagination
        const totalCount = await prisma.pallet.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch pallets with pagination and related data
        const pallets = await prisma.pallet.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
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
                items: {
                    include: {
                        storageItem: {
                            include: {
                                item: true,
                            },
                        },
                        spk: {
                            select: {
                                id: true,
                                code: true,
                            },
                        },
                    },
                },
            },
        })

        // Calculate totals for each pallet
        const palletsWithTotals = pallets.map((pallet) => {
            const totalQuantity = pallet.items.reduce(
                (sum, item) => sum + item.quantity,
                0,
            )
            const itemTypes = new Set(
                pallet.items.map((item) => item.storageItem.item.type),
            )

            return {
                ...pallet,
                totalQuantity,
                itemTypes: Array.from(itemTypes),
                itemCount: pallet.items.length,
            }
        })

        return res.json(
            successResponse(
                palletsWithTotals,
                'Pallets retrieved successfully',
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
        console.error('Error in getAllPallets:', error)
        return res.status(500).json(errorResponse('Failed to retrieve pallets'))
    }
}

// Get pallet by ID
export const getPalletById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const pallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                salesOrder: true,
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
                        spk: {
                            select: {
                                id: true,
                                code: true,
                                salesOrderId: true,
                            },
                        },
                    },
                },
            },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Calculate totals
        const totalQuantity = pallet.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
        )
        const itemTypes = pallet.items.map((item) => item.storageItem.item.type)
        const uniqueItemTypes = [...new Set(itemTypes)]

        const response = {
            ...pallet,
            totalQuantity,
            itemTypes: uniqueItemTypes,
            itemCount: pallet.items.length,
        }

        return res.json(
            successResponse(response, 'Pallet retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getPalletById:', error)
        return res.status(500).json(errorResponse('Failed to retrieve pallet'))
    }
}

// Create new pallet
export const createPallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { salesOrderId } = req.body

        // Check if sales order exists
        if (salesOrderId) {
            const salesOrder = await prisma.salesOrder.findUnique({
                where: { id: salesOrderId },
            })

            if (!salesOrder) {
                return res
                    .status(404)
                    .json(errorResponse('Sales order not found'))
            }
        }

        // Generate unique pallet code
        const code = await generatePalletCode()
        const qrCodeData = `PALLET:${code}:${new Date().getTime()}`

        // Create the pallet
        const pallet = await prisma.pallet.create({
            data: {
                code,
                qrCodeData,
                status: PalletStatus.READY,
                ...(salesOrderId && {
                    salesOrder: { connect: { id: salesOrderId } },
                }),
            },
        })

        return res
            .status(201)
            .json(successResponse(pallet, 'Pallet created successfully'))
    } catch (error) {
        console.error('Error in createPallet:', error)
        return res.status(500).json(errorResponse('Failed to create pallet'))
    }
}

// Update pallet details
export const updatePallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { salesOrderId, status } = req.body

        // Check if pallet exists
        const existingPallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!existingPallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Check if sales order exists if provided
        if (salesOrderId) {
            const salesOrder = await prisma.salesOrder.findUnique({
                where: { id: salesOrderId },
            })

            if (!salesOrder) {
                return res
                    .status(404)
                    .json(errorResponse('Sales order not found'))
            }
        }

        // Validate status change if pallet has items
        if (
            status === PalletStatus.SHIPPED &&
            existingPallet.items.length === 0
        ) {
            return res
                .status(400)
                .json(errorResponse('Cannot mark empty pallet as shipped'))
        }

        // Update pallet
        const updatedPallet = await prisma.pallet.update({
            where: { id },
            data: {
                salesOrder: salesOrderId
                    ? { connect: { id: salesOrderId } }
                    : undefined,
                status: status as PalletStatus,
            },
            include: {
                salesOrder: true,
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
        })

        return res.json(
            successResponse(updatedPallet, 'Pallet updated successfully'),
        )
    } catch (error) {
        console.error('Error in updatePallet:', error)
        return res.status(500).json(errorResponse('Failed to update pallet'))
    }
}

// Delete pallet
export const deletePallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        // Check if pallet exists
        const existingPallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!existingPallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Don't allow deletion if pallet has been shipped
        if (existingPallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot delete shipped pallets'))
        }

        // Handle returning items to storage if pallet has items
        if (existingPallet.items.length > 0) {
            await prisma.$transaction(async (tx) => {
                // Return each item to storage
                for (const item of existingPallet.items) {
                    await tx.storage.update({
                        where: { id: item.storageItemId },
                        data: {
                            stock: { increment: item.quantity },
                        },
                    })
                }

                // Delete pallet items
                await tx.palletItem.deleteMany({
                    where: { palletId: id },
                })

                // Delete the pallet
                await tx.pallet.delete({
                    where: { id },
                })
            })
        } else {
            // If no items, simply delete the pallet
            await prisma.pallet.delete({
                where: { id },
            })
        }

        return res.json(successResponse(null, 'Pallet deleted successfully'))
    } catch (error) {
        console.error('Error in deletePallet:', error)
        return res.status(500).json(errorResponse('Failed to delete pallet'))
    }
}

// Add items to pallet
export const addPalletItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { palletId } = req.params
        const { storageId, spkId, quantity } = req.body

        // Check if pallet exists
        const pallet = await prisma.pallet.findUnique({
            where: { id: palletId },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Don't allow adding items to shipped pallets
        if (pallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot add items to shipped pallets'))
        }

        // Check if storage item exists
        const storage = await prisma.storage.findUnique({
            where: { id: storageId },
            include: {
                spk: true,
                item: true,
            },
        })

        if (!storage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        // Check if SPK exists
        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
        })

        if (!spk) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        // Check if there's enough stock
        if (storage.stock < quantity) {
            return res.status(400).json(
                errorResponse('Insufficient stock in storage', {
                    available: storage.stock,
                    requested: quantity,
                }),
            )
        }

        // Create transaction to add item to pallet and reduce storage stock
        const result = await prisma.$transaction(async (tx) => {
            // Reduce storage stock
            const updatedStorage = await tx.storage.update({
                where: { id: storageId },
                data: {
                    stock: { decrement: quantity },
                },
            })

            // Check if an item for this storage already exists in the pallet
            const existingPalletItem = await tx.palletItem.findUnique({
                where: {
                    palletId_storageItemId_spkId: {
                        palletId,
                        storageItemId: storageId,
                        spkId,
                    },
                },
            })

            let palletItem

            if (existingPalletItem) {
                // Update existing pallet item quantity
                palletItem = await tx.palletItem.update({
                    where: {
                        id: existingPalletItem.id,
                    },
                    data: {
                        quantity: { increment: quantity },
                    },
                    include: {
                        storageItem: {
                            include: {
                                item: true,
                            },
                        },
                    },
                })
            } else {
                // Create new pallet item
                palletItem = await tx.palletItem.create({
                    data: {
                        pallet: { connect: { id: palletId } },
                        storageItem: { connect: { id: storageId } },
                        spk: { connect: { id: spkId } },
                        quantity,
                    },
                    include: {
                        storageItem: {
                            include: {
                                item: true,
                            },
                        },
                    },
                })
            }

            // If no salesOrderId is assigned to the pallet yet, use the one from the SPK
            if (!pallet.salesOrderId) {
                await tx.pallet.update({
                    where: { id: palletId },
                    data: {
                        salesOrder: { connect: { id: spk.salesOrderId } },
                    },
                })
            }

            return palletItem
        })

        return res
            .status(201)
            .json(successResponse(result, 'Item added to pallet successfully'))
    } catch (error) {
        console.error('Error in addPalletItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to add item to pallet'))
    }
}

// Remove item from pallet
export const removePalletItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { palletId, itemId } = req.params

        // Check if pallet exists
        const pallet = await prisma.pallet.findUnique({
            where: { id: palletId },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Don't allow removing items from shipped pallets
        if (pallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot remove items from shipped pallets'))
        }

        // Check if pallet item exists
        const palletItem = await prisma.palletItem.findUnique({
            where: { id: itemId },
            include: {
                storageItem: true,
            },
        })

        if (!palletItem) {
            return res.status(404).json(errorResponse('Pallet item not found'))
        }

        if (palletItem.palletId !== palletId) {
            return res
                .status(400)
                .json(errorResponse('Item does not belong to this pallet'))
        }

        // Transaction to remove pallet item and restore storage stock
        await prisma.$transaction(async (tx) => {
            // Restore storage stock
            await tx.storage.update({
                where: { id: palletItem.storageItemId },
                data: {
                    stock: { increment: palletItem.quantity },
                },
            })

            // Delete the pallet item
            await tx.palletItem.delete({
                where: { id: itemId },
            })
        })

        return res.json(
            successResponse(null, 'Item removed from pallet successfully'),
        )
    } catch (error) {
        console.error('Error in removePalletItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to remove item from pallet'))
    }
}

// Update pallet item quantity
export const updatePalletItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { palletId, itemId } = req.params
        const { quantity } = req.body

        // Check inputs
        if (quantity <= 0) {
            return res
                .status(400)
                .json(errorResponse('Quantity must be positive'))
        }

        // Check if pallet exists
        const pallet = await prisma.pallet.findUnique({
            where: { id: palletId },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Don't allow updating items in shipped pallets
        if (pallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot update items in shipped pallets'))
        }

        // Check if pallet item exists
        const palletItem = await prisma.palletItem.findUnique({
            where: { id: itemId },
            include: {
                storageItem: true,
            },
        })

        if (!palletItem) {
            return res.status(404).json(errorResponse('Pallet item not found'))
        }

        if (palletItem.palletId !== palletId) {
            return res
                .status(400)
                .json(errorResponse('Item does not belong to this pallet'))
        }

        // Calculate quantity difference
        const quantityDiff = quantity - palletItem.quantity

        // If no change in quantity, return early
        if (quantityDiff === 0) {
            return res.json(
                successResponse(palletItem, 'No change in quantity'),
            )
        }

        // Transaction to update pallet item and adjust storage stock
        const result = await prisma.$transaction(async (tx) => {
            let updatedStorage

            // If increasing quantity, check if there's enough stock
            if (quantityDiff > 0) {
                const storage = await tx.storage.findUnique({
                    where: { id: palletItem.storageItemId },
                })

                if (!storage || storage.stock < quantityDiff) {
                    throw new Error('Insufficient stock in storage')
                }

                // Decrease storage stock
                updatedStorage = await tx.storage.update({
                    where: { id: palletItem.storageItemId },
                    data: {
                        stock: { decrement: quantityDiff },
                    },
                })
            } else {
                // If decreasing quantity, increase storage stock
                updatedStorage = await tx.storage.update({
                    where: { id: palletItem.storageItemId },
                    data: {
                        stock: { increment: -quantityDiff },
                    },
                })
            }

            // Update pallet item quantity
            const updatedItem = await tx.palletItem.update({
                where: { id: itemId },
                data: {
                    quantity,
                },
                include: {
                    storageItem: {
                        include: {
                            item: true,
                        },
                    },
                },
            })

            return {
                palletItem: updatedItem,
                storage: updatedStorage,
            }
        })

        return res.json(
            successResponse(
                result,
                'Pallet item quantity updated successfully',
            ),
        )
    } catch (error) {
        console.error('Error in updatePalletItem:', error)

        // Provide more specific error message
        if (
            error instanceof Error &&
            error.message === 'Insufficient stock in storage'
        ) {
            return res
                .status(400)
                .json(errorResponse('Insufficient stock in storage'))
        }

        return res
            .status(500)
            .json(errorResponse('Failed to update pallet item'))
    }
}

// Mark pallet as shipped
export const markAsShipped = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        // Check if pallet exists
        const pallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        // Don't allow shipping empty pallets
        if (pallet.items.length === 0) {
            return res
                .status(400)
                .json(errorResponse('Cannot ship empty pallet'))
        }

        // Update pallet status
        const updatedPallet = await prisma.pallet.update({
            where: { id },
            data: {
                status: PalletStatus.SHIPPED,
            },
            include: {
                salesOrder: true,
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
        })

        return res.json(
            successResponse(
                updatedPallet,
                'Pallet marked as shipped successfully',
            ),
        )
    } catch (error) {
        console.error('Error in markAsShipped:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to mark pallet as shipped'))
    }
}

export default {
    getAllPallets,
    getPalletById,
    createPallet,
    updatePallet,
    deletePallet,
    addPalletItem,
    removePalletItem,
    updatePalletItem,
    markAsShipped,
}
