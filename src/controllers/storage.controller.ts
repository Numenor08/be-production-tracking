import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { ProcessStage } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import {
    recordAddStockMutation,
    recordReduceStockMutation,
    recordDeliveryMutation,
    recordPalletMutation,
} from '../utils/stockMutation.utils'

const prisma = new PrismaClient()

export const getAllStorage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 100
        const search = req.query.search as string | undefined
        const itemType = req.query.itemType as string | undefined
        const stage = req.query.stage as ProcessStage | undefined

        const where: any = {}

        if (search) {
            where.OR = [
                { item: { name: { contains: search } } },
                { spk: { code: { contains: search } } },
            ]
        }

        if (itemType) {
            where.item = {
                type: itemType,
            }
        }

        if (stage) {
            where.productionStage = stage
        }

        const totalCount = await prisma.storage.count({ where })
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const storageItems = await prisma.storage.findMany({
            where,
            skip,
            take: limit,
            include: {
                item: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        price: true,
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
            },
            orderBy: { updatedAt: 'desc' },
        })

        const total: Record<string, number> = {}
        storageItems.forEach((item) => {
            const key = `${item.item.name}`
            total[key] = (total[key] || 0) + item.stock
        })

        return res.json(
            successResponse(
                storageItems,
                'Storage items retrieved successfully',
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
        console.error('Error in getAllStorage:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve storage items'))
    }
}

export const getStorageById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const storage = await prisma.storage.findUnique({
            where: { id },
            include: {
                item: true,
                spk: {
                    include: {
                        salesOrder: true,
                    },
                },
            },
        })

        if (!storage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        return res.json(
            successResponse(storage, 'Storage item retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getStorageById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve storage item'))
    }
}

export const createStorage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { spkId, itemId, spkStage, stock } = req.body

        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const existingStorage = await prisma.storage.findFirst({
            where: {
                spkId,
                itemId,
                spkStage,
            },
        })

        if (existingStorage) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Storage entry already exists for this SPK, item, and stage status',
                    ),
                )
        }

        const storage = await prisma.storage.create({
            data: {
                spk: { connect: { id: spkId } },
                item: { connect: { id: itemId } },
                spkStage,
                stock: stock || 0,
            },
            include: {
                item: true,
                spk: true,
            },
        })

        return res
            .status(201)
            .json(
                successResponse(storage, 'Storage entry created successfully'),
            )
    } catch (error) {
        console.error('Error in createStorage:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to create storage entry'))
    }
}

export const updateStorage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { stock } = req.body

        const existingStorage = await prisma.storage.findUnique({
            where: { id },
        })

        if (!existingStorage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        const updatedStorage = await prisma.storage.update({
            where: { id },
            data: {
                stock: stock !== undefined ? stock : existingStorage.stock,
            },
            include: {
                item: true,
                spk: true,
            },
        })

        return res.json(
            successResponse(
                updatedStorage,
                'Storage item updated successfully',
            ),
        )
    } catch (error) {
        console.error('Error in updateStorage:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update storage item'))
    }
}

export const deleteStorage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existingStorage = await prisma.storage.findUnique({
            where: { id },
            include: {
                palletItems: true,
            },
        })

        if (!existingStorage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        if (existingStorage.palletItems.length > 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot delete storage item that is referenced in pallets',
                    ),
                )
        }

        await prisma.storage.delete({
            where: { id },
        })

        return res.json(
            successResponse(null, 'Storage item deleted successfully'),
        )
    } catch (error) {
        console.error('Error in deleteStorage:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to delete storage item'))
    }
}

export const transferStock = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { sourceId, targetId, quantity } = req.body

        if (quantity <= 0) {
            return res
                .status(400)
                .json(errorResponse('Transfer quantity must be positive'))
        }

        const result = await prisma.$transaction(async (tx) => {
            const source = await tx.storage.findUnique({
                where: { id: sourceId },
            })

            if (!source) {
                throw new Error('Source storage not found')
            }

            if (source.stock < quantity) {
                throw new Error('Insufficient stock in source storage')
            }

            let target
            if (targetId) {
                target = await tx.storage.findUnique({
                    where: { id: targetId },
                })

                if (!target) {
                    throw new Error('Target storage not found')
                }
            }

            const updatedSource = await tx.storage.update({
                where: { id: sourceId },
                data: {
                    stock: {
                        decrement: quantity,
                    },
                },
            })

            const updatedTarget = await tx.storage.update({
                where: { id: targetId },
                data: {
                    stock: {
                        increment: quantity,
                    },
                },
            })

            return {
                source: updatedSource,
                target: updatedTarget,
            }
        })

        return res.json(
            successResponse(
                result,
                `Successfully transferred ${quantity} units from source to target`,
            ),
        )
    } catch (error) {
        console.error('Error in transferStock:', error)
        return res
            .status(500)
            .json(
                errorResponse(
                    `Failed to transfer stock: ${(error as Error).message}`,
                ),
            )
    }
}

export const getStorageByItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { itemId } = req.params

        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const storageItems = await prisma.storage.findMany({
            where: { itemId },
            include: {
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
            },
        })

        const totalStock = storageItems.reduce(
            (sum, item) => sum + item.stock,
            0,
        )

        return res.json(
            successResponse(
                {
                    item,
                    storageItems,
                    totals: {
                        stock: totalStock,
                    },
                },
                'Item storage details retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getStorageByItem:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve item storage details'))
    }
}

export const getStorageBySPK = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { spkId } = req.params

        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        const storageItems = await prisma.storage.findMany({
            where: { spkId },
            include: {
                item: true,
            },
        })

        const groupedByStage = storageItems.reduce((acc: any, item) => {
            const stageName = item.spkStage ?? 'UNKNOWN_STAGE'
            if (!acc[stageName]) {
                acc[stageName] = []
            }
            acc[stageName].push(item)
            return acc
        }, {})

        return res.json(
            successResponse(
                {
                    spkId,
                    storageItems,
                    groupedByStage,
                },
                'SPK storage details retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getStorageBySPK:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve SPK storage details'))
    }
}

export const reduceStockByItem = async (
    req: Request, 
    res: Response
): Promise<any> => {
    try {
        const { itemId, quantity } = req.body
        
        if (!itemId || !quantity || quantity <= 0) {
            return res.status(400).json(errorResponse('Valid itemId and positive quantity are required'))
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId }
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const result = await reduceStockFromStorage(prisma, itemId, quantity)

        if (!result.success) {
            return res.status(400).json(errorResponse(result.message))
        }

        return res.json(successResponse(
            { 
                itemId,
                itemName: item.name,
                quantityReduced: quantity,
                updates: result.updates 
            },
            'Stock reduced successfully'
        ))
    } catch (error) {
        console.error('Error in reduceStockByItem:', error)
        return res.status(500).json(errorResponse(
            `Failed to reduce stock: ${(error as Error).message}`
        ))
    }
}

export const addStockByItem = async (
    req: Request, 
    res: Response
): Promise<any> => {
    try {
        const { itemId, spkId = '', quantity, stage = undefined } = req.body
        
       if (!itemId || !quantity || quantity <= 0) {
            return res.status(400).json(errorResponse(
                'Valid itemId and positive quantity are required'
            ))
        }

        const result = await addStockToStorage(prisma, itemId, spkId, quantity, stage as ProcessStage)

        if (!result.success) {
            return res.status(400).json(errorResponse(result.message))
        }

        return res.json(successResponse(
            {
                storage: result.storage,
                quantityAdded: quantity
            },
            'Stock added successfully'
        ))
    } catch (error) {
        console.error('Error in addStockByItem:', error)
        return res.status(500).json(errorResponse(
            `Failed to add stock: ${(error as Error).message}`
        ))
    }
}

export const reduceStockFromStorage = async (
    prismaInstance: PrismaClient,
    itemId: string,
    quantity: number,
    prioritySpkId?: string
): Promise<{success: boolean, message: string, updates?: any[]}> => {
    try {
        if (!itemId || !quantity || quantity <= 0) {
            return {success: false, message: 'Valid itemId and positive quantity are required'}
        }

        let storageItems;
        
        if (prioritySpkId) {
            const priorityItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    spkId: prioritySpkId,
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });

            const otherItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    spkId: { not: prioritySpkId },
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });

            storageItems = [...priorityItems, ...otherItems];
        } else {
            storageItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });
        }

        const totalAvailable = storageItems.reduce((sum, item) => sum + item.stock, 0)
        
        if (totalAvailable < quantity) {
            const itemName = storageItems.length > 0 ? storageItems[0].item.name : '(unknown)';
            return {
                success: false, 
                message: `Insufficient stock for item ${itemName}. Requested: ${quantity}, Available: ${totalAvailable}`
            }
        }

        const updates = await prismaInstance.$transaction(async (tx) => {
            let remainingToReduce = quantity;
            const updateList = [];
            
            for (const storage of storageItems) {
                if (remainingToReduce <= 0) break
                
                const toReduce = Math.min(storage.stock, remainingToReduce)
                const quantityBefore = storage.stock
                
                const updated = await tx.storage.update({
                    where: { id: storage.id },
                    data: { stock: { decrement: toReduce } },
                    include: {
                        spk: { select: { code: true } },
                        item: { select: { name: true } }
                    }
                })

                try {
                    await recordReduceStockMutation(
                        tx,
                        itemId,
                        storage.id,
                        toReduce,
                        quantityBefore,
                        {
                            spkId: prioritySpkId || storage.spkId || undefined,
                            notes: `Stock reduction - FIFO${prioritySpkId ? ' with SPK priority' : ''}`,
                            stage: storage.spkStage as ProcessStage | undefined,
                        }
                    )
                } catch (mutationError) {
                    console.error('Error recording reduce stock mutation:', mutationError)
                }
                
                updateList.push({
                    storageId: storage.id,
                    spkCode: updated.spk?.code,
                    itemName: updated.item.name,
                    quantityReduced: toReduce,
                    remaining: updated.stock
                })
                
                remainingToReduce -= toReduce
            }
            
            await tx.storage.deleteMany({
                where: { 
                    itemId,
                    stock: 0 
                }
            })
            
            return updateList;
        });

        return {
            success: true,
            message: 'Stock reduced successfully',
            updates
        }
    } catch (error) {
        console.error('Error in reduceStockFromStorage:', error)
        return {success: false, message: (error as Error).message}
    }
}

export const addStockToStorage = async (
    prismaInstance: PrismaClient,
    itemId: string,
    spkId: string = '',
    quantity: number,
    stage?: ProcessStage,
    options: {
        performedByUserId?: string
        notes?: string
        productionReportId?: string
    } = {}
): Promise<{success: boolean, message: string, storage?: any}> => {
    try {
        if (!itemId || !quantity || quantity <= 0) {
            return {success: false, message: 'Valid itemId and positive quantity are required'}
        }

        const item = await prismaInstance.item.findUnique({
            where: { id: itemId }
        });

        if (!item) {
            return {success: false, message: `Item with ID ${itemId} not found`};
        }

        const result = await prismaInstance.$transaction(async (tx) => {
            const whereClause: any = {
                itemId,
            };
            if (spkId) {
                if (stage !== undefined) {
                    whereClause.spkStage = stage;
                }
                whereClause.spkId = spkId;
            }

            const existingStorage = await tx.storage.findFirst({
                where: whereClause
            });

            let storage;
            let quantityBefore = 0;

            if (existingStorage) {
                quantityBefore = existingStorage.stock;
                storage = await tx.storage.update({
                    where: { id: existingStorage.id },
                    data: { stock: { increment: quantity } },
                    include: {
                        item: { select: { name: true } },
                        spk: { select: { code: true } }
                    }
                });
            } else {
                const data: any = {
                    itemId,
                    stock: quantity
                };
                if (spkId) {
                    data.spkId = spkId;
                }
                if (stage !== undefined) {
                    data.spkStage = stage;
                }
                storage = await tx.storage.create({
                    data,
                    include: {
                        item: { select: { name: true } },
                        spk: { select: { code: true } }
                    }
                });
            }

            try {
                await recordAddStockMutation(
                    tx,
                    itemId,
                    storage.id,
                    quantity,
                    quantityBefore,
                    {
                        spkId: spkId || undefined,
                        stage,
                        ...options,
                    }
                );
            } catch (mutationError) {
                console.error('Error recording stock mutation:', mutationError);
            }

            return storage;
        });

        return {
            success: true,
            message: 'Stock added successfully',
            storage: result
        }
    } catch (error) {
        console.error('Error in addStockToStorage:', error)
        return {success: false, message: (error as Error).message}
    }
}

export const reduceStockForPallet = async (
    req: Request, 
    res: Response
): Promise<any> => {
    try {
        const { itemId, quantity, prioritySpkId } = req.body
        
        if (!itemId || !quantity || quantity <= 0) {
            return res.status(400).json(errorResponse('Valid itemId and positive quantity are required'))
        }

        const item = await prisma.item.findUnique({
            where: { id: itemId }
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const result = await reduceStockFromStorage(prisma, itemId, quantity, prioritySpkId)

        if (!result.success) {
            return res.status(400).json(errorResponse(result.message))
        }

        return res.json(successResponse(
            { 
                itemId,
                itemName: item.name,
                quantityReduced: quantity,
                prioritySpkId: prioritySpkId || null,
                updates: result.updates 
            },
            'Stock reduced successfully for pallet'
        ))
    } catch (error) {
        console.error('Error in reduceStockForPallet:', error)
        return res.status(500).json(errorResponse(
            `Failed to reduce stock: ${(error as Error).message}`
        ))
    }
}

export const reduceStockForPalletUtil = async (
    prismaInstance: PrismaClient,
    palletId: string,
    itemId: string,
    quantity: number,
    prioritySpkId?: string
): Promise<{success: boolean, message: string, palletItems?: any[], totalQuantityReduced?: number}> => {
    try {
        if (!palletId || !itemId || !quantity || quantity <= 0) {
            return {success: false, message: 'Valid palletId, itemId and positive quantity are required'}
        }

        let storageItems;
        
        if (prioritySpkId) {
            const priorityItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    spkId: prioritySpkId,
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });

            const otherItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    spkId: { not: prioritySpkId },
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });

            storageItems = [...priorityItems, ...otherItems];
        } else {
            storageItems = await prismaInstance.storage.findMany({
                where: { 
                    itemId,
                    stock: { gt: 0 } 
                },
                orderBy: { createdAt: 'asc' },
                include: {
                    item: {
                        select: {
                            name: true
                        }
                    },
                    spk: {
                        select: {
                            code: true
                        }
                    }
                }
            });
        }

        const totalAvailable = storageItems.reduce((sum, item) => sum + item.stock, 0)
        
        if (totalAvailable < quantity) {
            const itemName = storageItems.length > 0 ? storageItems[0].item.name : '(unknown)';
            return {
                success: false, 
                message: `Insufficient stock for item ${itemName}. Requested: ${quantity}, Available: ${totalAvailable}`
            }
        }

        const result = await prismaInstance.$transaction(async (tx) => {
            let remainingToReduce = quantity;
            const palletItems = [];
            let totalQuantityReduced = 0;
            
            for (const storage of storageItems) {
                if (remainingToReduce <= 0) break
                
                const toReduce = Math.min(storage.stock, remainingToReduce)
                const quantityBefore = storage.stock
                
                const updated = await tx.storage.update({
                    where: { id: storage.id },
                    data: { stock: { decrement: toReduce } },
                })
                
                const existingPalletItem = await tx.palletItem.findUnique({
                    where: {
                        palletId_storageItemId: {
                            palletId,
                            storageItemId: storage.id,
                        },
                    },
                });

                let palletItem;
                if (existingPalletItem) {
                    palletItem = await tx.palletItem.update({
                        where: { id: existingPalletItem.id },
                        data: {
                            quantity: existingPalletItem.quantity + toReduce,
                        },
                        include: {
                            storageItem: {
                                include: {
                                    item: true,
                                    spk: { select: { code: true } }
                                }
                            }
                        }
                    });
                } else {
                    palletItem = await tx.palletItem.create({
                        data: {
                            palletId,
                            storageItemId: storage.id,
                            quantity: toReduce,
                        },
                        include: {
                            storageItem: {
                                include: {
                                    item: true,
                                    spk: { select: { code: true } }
                                }
                            }
                        }
                    });
                }

                try {
                    await recordPalletMutation(
                        tx,
                        itemId,
                        storage.id,
                        toReduce,
                        quantityBefore,
                        {
                            spkId: prioritySpkId || storage.spkId || undefined,
                            palletId,
                            notes: `Items moved to pallet${prioritySpkId ? ' (priority SPK)' : ' (FIFO)'}`,
                            stage: storage.spkStage as ProcessStage | undefined,
                        }
                    )
                } catch (mutationError) {
                    console.error('Error recording pallet mutation:', mutationError)
                }
                
                palletItems.push(palletItem);
                totalQuantityReduced += toReduce;
                remainingToReduce -= toReduce;
            }
            
            await tx.storage.deleteMany({
                where: { 
                    itemId,
                    stock: 0 
                }
            })
            
            return { palletItems, totalQuantityReduced };
        });

        return {
            success: true,
            message: 'Stock reduced and pallet items created successfully',
            palletItems: result.palletItems,
            totalQuantityReduced: result.totalQuantityReduced
        }
    } catch (error) {
        console.error('Error in reduceStockForPalletUtil:', error)
        return {success: false, message: (error as Error).message}
    }
}

export default {
    getAllStorage,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
    transferStock,
    getStorageByItem,
    getStorageBySPK,
    reduceStockByItem,
    addStockByItem,
    reduceStockForPallet,
}

