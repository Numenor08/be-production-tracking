import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { PalletStatus, ProductionReportTag } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generatePalletCode } from '../libs/generate'
import { reduceStockFromStorage, addStockToStorage, reduceStockForPalletUtil } from './storage.controller'
import { recordPalletMutation } from '../utils/stockMutation.utils'

const prisma = new PrismaClient()

export const getAllPallets = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as string | undefined
        const status = req.query.status as PalletStatus | undefined
        const salesOrderId = req.query.salesOrderId as string | undefined

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

        const totalCount = await prisma.pallet.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

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
                    },
                },
            },
        })

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
                    },
                },
            },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

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

export const createPallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { salesOrderId, itemId, maxQuantity } = req.body

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id: salesOrderId },
            include: {
                items: {
                    where: { itemId },
                },
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
                        'Sales order must be completed to create pallets',
                    ),
                )
        }

        if (salesOrder.items.length === 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Item not found in this sales order',
                    ),
                )
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const code = await generatePalletCode()
        const qrCodeData = `PALLET:${code}:${new Date().getTime()}`

        const finalMaxQuantity = maxQuantity || salesOrder.maxQuantityPerPallet

        const pallet = await prisma.pallet.create({
            data: {
                code,
                qrCodeData,
                salesOrderId,
                itemId,
                maxQuantity: finalMaxQuantity,
                status: PalletStatus.NOT_READY,
            },
            include: {
                salesOrder: {
                    include: {
                        customer: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                item: true,
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

        return res.status(201).json(
            successResponse(pallet, 'Pallet created successfully'),
        )
    } catch (error) {
        console.error('Error in createPallet:', error)
        return res.status(500).json(errorResponse('Failed to create pallet'))
    }
}

export const updatePallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { salesOrderId, status } = req.body

        const existingPallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!existingPallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

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

        if (
            status === PalletStatus.SHIPPED &&
            existingPallet.items.length === 0
        ) {
            return res
                .status(400)
                .json(errorResponse('Cannot mark empty pallet as shipped'))
        }

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

export const deletePallet = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existingPallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!existingPallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        if (existingPallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot delete shipped pallets'))
        }

        if (existingPallet.items.length > 0) {
            await prisma.$transaction(async (tx) => {
                for (const item of existingPallet.items) {
                    await tx.storage.update({
                        where: { id: item.storageItemId },
                        data: {
                            stock: { increment: item.quantity },
                        },
                    })
                }

                await tx.palletItem.deleteMany({
                    where: { palletId: id },
                })

                await tx.pallet.delete({
                    where: { id },
                })
            })
        } else {
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

export const addPalletItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { palletId } = req.params
        const { itemId, quantity } = req.body

        const pallet = await prisma.pallet.findUnique({
            where: { id: palletId },
            include: {
                items: true,
                item: true,
                salesOrder: {
                    include: {
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

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        if (pallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot add items to shipped pallet'))
        }

        if (itemId !== pallet.itemId) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Item does not match pallet item type',
                    ),
                )
        }

        const currentTotalQuantity = pallet.currentQuantity || 0
        
        if (currentTotalQuantity + quantity > pallet.maxQuantity) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        `Adding ${quantity} items would exceed pallet capacity. Current: ${currentTotalQuantity}, Max: ${pallet.maxQuantity}`,
                    ),
                )
        }

        const prioritySpkIds = pallet.salesOrder.spk.map(spk => spk.id)
        
        let stockReductionResult;
        let usedPrioritySpk = false;

        for (const spkId of prioritySpkIds) {
            stockReductionResult = await reduceStockForPalletUtil(prisma, palletId, itemId, quantity, spkId);
            if (stockReductionResult.success) {
                usedPrioritySpk = true;
                break;
            }
        }

        if (!stockReductionResult || !stockReductionResult.success) {
            stockReductionResult = await reduceStockForPalletUtil(prisma, palletId, itemId, quantity);
        }

        if (!stockReductionResult.success) {
            return res.status(400).json(errorResponse(stockReductionResult.message));
        }

        const updatedPallet = await prisma.$transaction(async (tx) => {
            const newCurrentQuantity = currentTotalQuantity + (stockReductionResult?.totalQuantityReduced || 0);
            
            const palletStatus = newCurrentQuantity >= pallet.maxQuantity 
                ? PalletStatus.READY 
                : PalletStatus.NOT_READY;

            const updatedPallet = await tx.pallet.update({
                where: { id: palletId },
                data: {
                    currentQuantity: newCurrentQuantity,
                    status: palletStatus,
                },
                include: {
                    item: true,
                    items: {
                        include: {
                            storageItem: {
                                include: {
                                    item: true,
                                    spk: {
                                        select: {
                                            code: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    salesOrder: {
                        include: {
                            customer: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            return updatedPallet;
        });

        return res.json(
            successResponse(
                {
                    pallet: updatedPallet,
                    stockReduction: {
                        quantity: stockReductionResult?.totalQuantityReduced || 0,
                        usedPrioritySpk,
                        palletItems: stockReductionResult?.palletItems || [],
                    },
                },
                `Added ${stockReductionResult?.totalQuantityReduced || 0} items to pallet successfully using ${usedPrioritySpk ? 'priority SPK' : 'FIFO'} method`,
            ),
        )
    } catch (error) {
        console.error('Error in addPalletItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to add item to pallet'))
    }
}

export const markAsShipped = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const pallet = await prisma.pallet.findUnique({
            where: { id },
            include: {
                items: true,
            },
        })

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        if (pallet.items.length === 0) {
            return res
                .status(400)
                .json(errorResponse('Cannot ship empty pallet'))
        }

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

export const createPalletsForSalesOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { salesOrderId, autoFill } = req.body

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id: salesOrderId },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
                pallets: true,
                spk: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
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
                        'Sales order must be completed to create pallets',
                    ),
                )
        }

        const createdPallets = []
        const maxQuantityPerPallet = salesOrder.maxQuantityPerPallet

        for (const salesOrderItem of salesOrder.items) {
            if (!salesOrderItem.item) continue

            const targetQuantity = salesOrderItem.targetQuantity
            const numberOfPallets = Math.ceil(targetQuantity / maxQuantityPerPallet)

            for (let i = 0; i < numberOfPallets; i++) {
                const code = await generatePalletCode()
                const qrCodeData = `PALLET:${code}:${new Date().getTime()}`
                
                const remainingQuantity = targetQuantity - (i * maxQuantityPerPallet)
                const palletTargetQuantity = Math.min(remainingQuantity, maxQuantityPerPallet)

                const pallet = await prisma.pallet.create({
                    data: {
                        code,
                        qrCodeData,
                        salesOrderId,
                        itemId: salesOrderItem.item.id,
                        maxQuantity: maxQuantityPerPallet,
                        currentQuantity: 0,
                        status: PalletStatus.NOT_READY,
                    },
                    include: {
                        item: true,
                    },
                })

                if (autoFill) {
                    try {
                        const prioritySpkIds = salesOrder.spk.map(spk => spk.id)
                        
                        let totalFilled = 0
                        let usedPrioritySpk = false
                        let stockResult = null

                        for (const spkId of prioritySpkIds) {
                            stockResult = await reduceStockForPalletUtil(
                                prisma, 
                                pallet.id,
                                salesOrderItem.item.id, 
                                palletTargetQuantity, 
                                spkId
                            )
                            if (stockResult.success) {
                                totalFilled = stockResult.totalQuantityReduced || 0
                                usedPrioritySpk = true
                                break
                            }
                        }

                        if (!stockResult || !stockResult.success || totalFilled < palletTargetQuantity) {
                            const remainingToFill = palletTargetQuantity - totalFilled
                            if (remainingToFill > 0) {
                                const fallbackResult = await reduceStockForPalletUtil(
                                    prisma, 
                                    pallet.id,
                                    salesOrderItem.item.id, 
                                    remainingToFill
                                )
                                if (fallbackResult.success) {
                                    totalFilled += fallbackResult.totalQuantityReduced || 0
                                }
                            }
                        }

                        if (totalFilled > 0) {
                            await prisma.pallet.update({
                                where: { id: pallet.id },
                                data: {
                                    currentQuantity: totalFilled,
                                    status: totalFilled >= maxQuantityPerPallet 
                                        ? PalletStatus.READY 
                                        : PalletStatus.NOT_READY,
                                },
                            })
                        }

                        createdPallets.push({
                            ...pallet,
                            targetQuantity: palletTargetQuantity,
                            actualQuantity: totalFilled,
                            usedPrioritySpk,
                        })
                    } catch (fillError) {
                        console.error('Error filling pallet:', fillError)
                        createdPallets.push({
                            ...pallet,
                            targetQuantity: palletTargetQuantity,
                            actualQuantity: 0,
                            fillError: 'Failed to auto-fill pallet',
                        })
                    }
                } else {
                    createdPallets.push({
                        ...pallet,
                        targetQuantity: palletTargetQuantity,
                        actualQuantity: 0,
                    })
                }
            }
        }

        return res.status(201).json(
            successResponse(
                {
                    salesOrderId,
                    totalPallets: createdPallets.length,
                    autoFill: autoFill || false,
                    pallets: createdPallets,
                    summary: {
                        readyPallets: createdPallets.filter(p => p.actualQuantity >= p.targetQuantity).length,
                        notReadyPallets: createdPallets.filter(p => p.actualQuantity < p.targetQuantity).length,
                    },
                },
                `Successfully created ${createdPallets.length} pallets for sales order ${autoFill ? 'with auto-fill' : ''}`,
            ),
        )
    } catch (error) {
        console.error('Error in createPalletsForSalesOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to create pallets for sales order'))
    }
}

export const fillPalletAutomatically = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { palletId } = req.params
        const { targetQuantity } = req.body

        const pallet = await prisma.pallet.findUnique({
            where: { id: palletId },
            include: {
                item: true,
                salesOrder: {
                    include: {
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

        if (!pallet) {
            return res.status(404).json(errorResponse('Pallet not found'))
        }

        if (pallet.status === PalletStatus.SHIPPED) {
            return res
                .status(400)
                .json(errorResponse('Cannot fill shipped pallet'))
        }

        const currentQuantity = pallet.currentQuantity || 0
        const maxQuantity = pallet.maxQuantity
        const quantityToFill = targetQuantity 
            ? Math.min(targetQuantity, maxQuantity - currentQuantity)
            : maxQuantity - currentQuantity

        if (quantityToFill <= 0) {
            return res
                .status(400)
                .json(errorResponse('Pallet is already full or target quantity is invalid'))
        }

        const prioritySpkIds = pallet.salesOrder.spk.map(spk => spk.id)
        
        let totalFilled = 0
        let usedPrioritySpk = false

        let stockResult = null

        for (const spkId of prioritySpkIds) {
            stockResult = await reduceStockForPalletUtil(
                prisma, 
                palletId,
                pallet.itemId, 
                quantityToFill, 
                spkId
            )
            if (stockResult.success) {
                usedPrioritySpk = true
                totalFilled = stockResult.totalQuantityReduced || 0
                break
            }
        }

        if (!stockResult || !stockResult.success || totalFilled < quantityToFill) {
            const remainingToFill = quantityToFill - totalFilled
            if (remainingToFill > 0) {
                const fallbackResult = await reduceStockForPalletUtil(
                    prisma, 
                    palletId,
                    pallet.itemId, 
                    remainingToFill
                )
                if (fallbackResult.success) {
                    totalFilled += fallbackResult.totalQuantityReduced || 0
                    stockResult = fallbackResult
                }
            }
        }

        if (totalFilled === 0) {
            return res
                .status(400)
                .json(errorResponse('No stock available for this item'))
        }

        const updatedPallet = await prisma.pallet.update({
            where: { id: palletId },
            data: {
                currentQuantity: currentQuantity + totalFilled,
                status: (currentQuantity + totalFilled) >= maxQuantity 
                    ? PalletStatus.READY 
                    : PalletStatus.NOT_READY,
            },
            include: {
                item: true,
                salesOrder: {
                    include: {
                        customer: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        return res.json(
            successResponse(
                {
                    pallet: updatedPallet,
                    fillingSummary: {
                        requested: quantityToFill,
                        actuallyFilled: totalFilled,
                        usedPrioritySpk,
                        palletItems: stockResult?.palletItems || [],
                    },
                },
                `Filled pallet with ${totalFilled} items successfully`,
            ),
        )
    } catch (error) {
        console.error('Error in fillPalletAutomatically:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to fill pallet automatically'))
    }
}

export const checkStockAvailabilityForSalesOrder = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { salesOrderId } = req.params

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id: salesOrderId },
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
                    },
                },
            },
        })

        if (!salesOrder) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        const stockAvailability = []

        for (const salesOrderItem of salesOrder.items) {
            if (!salesOrderItem.item) continue

            const storageItems = await prisma.storage.findMany({
                where: { 
                    itemId: salesOrderItem.item.id,
                    stock: { gt: 0 }
                },
                include: {
                    spk: {
                        select: {
                            id: true,
                            code: true,
                        },
                    },
                },
                orderBy: { createdAt: 'asc' }
            })

            const prioritySpkIds = salesOrder.spk.map(spk => spk.id)
            const priorityStock = storageItems
                .filter(storage => storage.spkId && prioritySpkIds.includes(storage.spkId))
                .reduce((sum, storage) => sum + storage.stock, 0)
            
            const regularStock = storageItems
                .filter(storage => !storage.spkId || !prioritySpkIds.includes(storage.spkId))
                .reduce((sum, storage) => sum + storage.stock, 0)

            const totalAvailable = priorityStock + regularStock
            const required = salesOrderItem.targetQuantity

            stockAvailability.push({
                item: salesOrderItem.item,
                required,
                available: {
                    priority: priorityStock,
                    regular: regularStock,
                    total: totalAvailable,
                },
                canFulfill: totalAvailable >= required,
                shortage: Math.max(0, required - totalAvailable),
                storageBreakdown: storageItems.map(storage => ({
                    id: storage.id,
                    stock: storage.stock,
                    spk: storage.spk,
                    isPriority: storage.spkId && prioritySpkIds.includes(storage.spkId),
                    stage: storage.spkStage,
                })),
            })
        }

        const overallCanFulfill = stockAvailability.every(item => item.canFulfill)
        const totalShortage = stockAvailability.reduce((sum, item) => sum + item.shortage, 0)

        return res.json(
            successResponse(
                {
                    salesOrder: {
                        id: salesOrder.id,
                        code: salesOrder.code,
                        maxQuantityPerPallet: salesOrder.maxQuantityPerPallet,
                    },
                    stockAvailability,
                    summary: {
                        canFulfillAll: overallCanFulfill,
                        totalShortage,
                        itemsWithShortage: stockAvailability.filter(item => !item.canFulfill).length,
                    },
                },
                'Stock availability checked successfully',
            ),
        )
    } catch (error) {
        console.error('Error in checkStockAvailabilityForSalesOrder:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to check stock availability'))
    }
}

export default {
    getAllPallets,
    getPalletById,
    createPallet,
    updatePallet,
    deletePallet,
    addPalletItem,
    markAsShipped,
    createPalletsForSalesOrder,
    fillPalletAutomatically,
    checkStockAvailabilityForSalesOrder,
}

