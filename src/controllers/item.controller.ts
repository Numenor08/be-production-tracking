import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { successResponse, errorResponse } from '../utils/api.utils'
import { ItemType } from '../types/types'
import { generateItemCode } from '../libs/generate'

const prisma = new PrismaClient()

export const getAllItems = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 50
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'
        const type = req.query.type as ItemType | undefined
        const includeStock = req.query.includeStock === 'true'

        const where: any = {}
        if (search) {
            where.OR = [{ name: { contains: search } }]
        }

        if (type) {
            where.type = type
        }

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        const totalCount = await prisma.item.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const items = await prisma.item.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: includeStock
                ? {
                      storageItems: true,
                  }
                : undefined,
        })

        let enhancedItems = items
        if (includeStock) {
            const itemIds = items.map((item) => item.id)
            const allStorageItems = await prisma.storage.findMany({
                where: {
                    itemId: { in: itemIds },
                },
                include: {
                    spk: {
                        select: {
                            id: true,
                            code: true,
                        },
                    },
                },
            })

            const stockByItemId: Record<
                string,
                {
                    totalStock: number
                    spkSources: Record<
                        string,
                        {
                            spkId: string
                            spkCode: string
                            stock: number
                        }
                        >
                    storageCount: number
                }
            > = {}

            for (const storageItem of allStorageItems) {
                const itemId = storageItem.itemId
                if (!itemId) continue

                if (!stockByItemId[itemId]) {
                    stockByItemId[itemId] = {
                        totalStock: 0,
                        spkSources: {},
                        storageCount: 0,
                    }
                }

                stockByItemId[itemId].totalStock += storageItem.stock

                const spkId = storageItem.spkId || 'unknown'
                if (!stockByItemId[itemId].spkSources[spkId]) {
                    stockByItemId[itemId].spkSources[spkId] = {
                        spkId: storageItem.spkId || 'unknown',
                        spkCode: storageItem.spk?.code || 'Unknown',
                        stock: 0,
                    }
                }

                stockByItemId[itemId].spkSources[spkId].stock += storageItem.stock
                stockByItemId[itemId].storageCount += 1
            }

            enhancedItems = items.map((item) => {
                const stockInfo = stockByItemId[item.id] || {
                    totalStock: 0,
                    spkSources: {},
                    storageCount: 0,
                }

                return {
                    ...item,
                    totalStock: stockInfo.totalStock,
                    stockSources: Object.values(stockInfo.spkSources),
                    storageCount: stockInfo.storageCount,
                    storageItems: undefined,
                }
            })
        }

        return res.json(
            successResponse(enhancedItems, 'Items retrieved successfully', {
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error in getAllItems:', error)
        return res.status(500).json(errorResponse('Failed to retrieve items'))
    }
}

export const getItemById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const item = await prisma.item.findUnique({
            where: { id },
            include: {
                salesOrderItems: {
                    include: {
                        salesOrder: {
                            select: {
                                id: true,
                                code: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        })

        if (!item) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const storageItems = await prisma.storage.findMany({
            where: { itemId: id },
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

        const stockBySPK = storageItems.reduce((acc: any, item) => {
            const spkId = item.spkId || 'unknown'

            if (!acc[spkId]) {
                acc[spkId] = {
                    spkId: item.spkId,
                    spkCode: item.spk?.code || 'Unknown',
                    salesOrderId: item.spk?.salesOrder?.id,
                    salesOrderCode: item.spk?.salesOrder?.code,
                    stock: 0,
                }
            }

            acc[spkId].stock += item.stock
            return acc
        }, {})

        const stockByStage = storageItems.reduce((acc: any, item) => {
            const stage = item.spkStage || 'unknown'

            if (!acc[stage]) {
                acc[stage] = {
                    stage: stage,
                    stock: 0,
                }
            }

            acc[stage].stock += item.stock
            return acc
        }, {})

        const enhancedItem = {
            ...item,
            stockInfo: {
                totalStock,
                stockBySPK: Object.values(stockBySPK),
                stockByStage: Object.values(stockByStage),
                storageItems,
            },
        }

        return res.json(
            successResponse(enhancedItem, 'Item retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getItemById:', error)
        return res.status(500).json(errorResponse('Failed to retrieve item'))
    }
}


export const createItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, type, price } = req.body

        if (
            (type === ItemType.MATERIAL || type === ItemType.PRODUCT) &&
            price === undefined
        ) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Price is required for MATERIAL and PRODUCT items',
                    ),
                )
        }
        
        const existingItem = await prisma.item.findFirst({
            where: { name, type: type as ItemType },
        })

        if (existingItem) {
            return res
                .status(400)
                .json(errorResponse('Item with this name already exists'))
        }

        const code = await generateItemCode(type as ItemType)

        const item = await prisma.item.create({
            data: {
                name,
                code,
                type: type as ItemType,
                price: price !== undefined ? Number(price) : null,
            },
        })

        return res
            .status(201)
            .json(successResponse(item, 'Item created successfully'))
    } catch (error) {
        console.error('Error in createItem:', error)
        return res.status(500).json(errorResponse('Failed to create item'))
    }
}

export const updateItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { name, type, price } = req.body

        const existing = await prisma.item.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        if (
            (type === ItemType.MATERIAL || type === ItemType.PRODUCT) &&
            price === undefined &&
            existing.price === null
        ) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Price is required when changing to MATERIAL or PRODUCT type',
                    ),
                )
        }

        const updated = await prisma.item.update({
            where: { id },
            data: {
                name,
                type: type as ItemType,
                price: price !== undefined ? Number(price) : undefined,
            },
        })

        return res.json(successResponse(updated, 'Item updated successfully'))
    } catch (error) {
        console.error('Error in updateItem:', error)
        return res.status(500).json(errorResponse('Failed to update item'))
    }
}

export const deleteItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const existing = await prisma.item.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const usedInStorage = await prisma.storage.findFirst({
            where: { itemId: id },
        })
        if (usedInStorage) {
            return res.status(400).json(
                errorResponse('Cannot delete item that is in storage', {
                    storageId: usedInStorage.id,
                }),
            )
        }

        const usedInSalesOrder = await prisma.salesOrderItem.findFirst({
            where: { itemId: id },
        })
        if (usedInSalesOrder) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot delete item that is used in sales orders',
                        { salesOrderItemId: usedInSalesOrder.id },
                    ),
                )
        }

        await prisma.item.delete({ where: { id } })

        return res.json(successResponse(null, 'Item deleted successfully'))
    } catch (error) {
        console.error('Error in deleteItem:', error)
        return res.status(500).json(errorResponse('Failed to delete item'))
    }
}

export const getItemStock = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existing = await prisma.item.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Item not found'))
        }

        const storageItems = await prisma.storage.findMany({
            where: { itemId: id },
            include: {
                spk: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
            },
        })

        const totalStock = storageItems.reduce(
            (sum, item) => sum + item.stock,
            0,
        )

        const stockBySource = storageItems.reduce((acc: any, item) => {
            const source = item.spkId || 'unknown'
            if (!acc[source]) {
                acc[source] = {
                    spkId: item.spkId,
                    spkCode: item.spk?.code || 'Unknown',
                    stock: 0,
                    wasteStock: 0,
                }
            }
            acc[source].stock += item.stock
            return acc
        }, {})

        return res.json(
            successResponse(
                {
                    item: existing,
                    totalStock,
                    stockDetails: storageItems,
                    stockBySource: Object.values(stockBySource),
                },
                'Item stock retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getItemStock:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve item stock'))
    }
}

export default {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemStock,
}

