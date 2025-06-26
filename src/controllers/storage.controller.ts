import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { ProcessStage } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'

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

        // Build where condition for filtering
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

        // Check if SPK exists
        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        // Check if item exists
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        // Check if storage already exists
        const existingStorage = await prisma.storage.findUnique({
            where: {
                spkId_itemId_spkStage: {
                    spkId,
                    itemId,
                    spkStage,
                },
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

        // Create storage entry
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

        // Check if storage exists
        const existingStorage = await prisma.storage.findUnique({
            where: { id },
        })

        if (!existingStorage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        // Update storage
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

        // Check if storage exists
        const existingStorage = await prisma.storage.findUnique({
            where: { id },
            include: {
                reportItems: true,
                palletItems: true,
            },
        })

        if (!existingStorage) {
            return res.status(404).json(errorResponse('Storage item not found'))
        }

        // Check if storage is in use
        if (existingStorage.reportItems.length > 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot delete storage item that is referenced in reports',
                    ),
                )
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

        // Delete storage
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
            // Get source and target storage
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

            // Decrease source stock
            const updatedSource = await tx.storage.update({
                where: { id: sourceId },
                data: {
                    stock: {
                        decrement: quantity,
                    },
                },
            })

            // Increase target stock
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

        // Check if item exists
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        // Get all storage entries for the item
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

        // Calculate totals
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

        // Check if SPK exists
        const spk = await prisma.sPK.findUnique({
            where: { id: spkId },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        // Get all storage entries for the SPK
        const storageItems = await prisma.storage.findMany({
            where: { spkId },
            include: {
                item: true,
            },
        })

        // Group by production stage
        const groupedByStage = storageItems.reduce((acc: any, item) => {
            const stageName = item.spkStage
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

export default {
    getAllStorage,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
    transferStock,
    getStorageByItem,
    getStorageBySPK,
}
