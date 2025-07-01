import { PrismaClient } from '../../generated/prisma'
import { MutationType, ProcessStage } from '../types/types'

type PrismaTransaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]

export interface StockMutationData {
    type: MutationType
    itemId: string
    storageId?: string
    quantityBefore: number
    quantityChange: number
    quantityAfter: number
    spkId?: string
    salesOrderId?: string
    deliveryOrderId?: string
    palletId?: string
    productionReportId?: string
    performedByUserId?: string
    notes?: string
    stage?: ProcessStage
}

export async function generateStockMutationCode(
    type: MutationType,
    itemCode: string,
): Promise<string> {
    const prisma = new PrismaClient()
    
    const typePrefix = {
        [MutationType.ADD_STOCK]: 'AS',
        [MutationType.REDUCE_STOCK]: 'RS',
        [MutationType.PRODUCTION]: 'PR',
        [MutationType.DELIVERY]: 'DL',
        [MutationType.TRANSFER]: 'TR',
        [MutationType.ADJUSTMENT]: 'AD',
    }

    const prefix = typePrefix[type]
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const count = await prisma.stockMutation.count({
        where: {
            type,
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    })

    const sequence = (count + 1).toString().padStart(3, '0')
    return `${prefix}-${dateStr}-${itemCode}-${sequence}`
}

export async function createStockMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    data: StockMutationData,
): Promise<any> {
    try {
        const item = await prismaInstance.item.findUnique({
            where: { id: data.itemId },
            select: { code: true, name: true },
        })

        if (!item) {
            throw new Error(`Item with ID ${data.itemId} not found`)
        }

        const code = await generateStockMutationCode(data.type, item.code)

        const mutation = await prismaInstance.stockMutation.create({
            data: {
                code,
                type: data.type,
                itemId: data.itemId,
                storageId: data.storageId,
                quantityBefore: data.quantityBefore,
                quantityChange: data.quantityChange,
                quantityAfter: data.quantityAfter,
                spkId: data.spkId,
                salesOrderId: data.salesOrderId,
                deliveryOrderId: data.deliveryOrderId,
                palletId: data.palletId,
                productionReportId: data.productionReportId,
                performedByUserId: data.performedByUserId,
                notes: data.notes,
                stage: data.stage,
            },
            include: {
                item: {
                    select: {
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
        })

        return mutation
    } catch (error) {
        console.error('Error creating stock mutation:', error)
        throw error
    }
}

export async function recordAddStockMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityAdded: number,
    quantityBefore: number,
    options: {
        spkId?: string
        salesOrderId?: string
        productionReportId?: string
        performedByUserId?: string
        notes?: string
        stage?: ProcessStage
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.ADD_STOCK,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: quantityAdded,
        quantityAfter: quantityBefore + quantityAdded,
        ...options,
    })
}

export async function recordReduceStockMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityReduced: number,
    quantityBefore: number,
    options: {
        spkId?: string
        salesOrderId?: string
        deliveryOrderId?: string
        palletId?: string
        productionReportId?: string
        performedByUserId?: string
        notes?: string
        stage?: ProcessStage
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.REDUCE_STOCK,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: -quantityReduced,
        quantityAfter: quantityBefore - quantityReduced,
        ...options,
    })
}

export async function recordProductionMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityProduced: number,
    quantityBefore: number,
    options: {
        spkId?: string
        salesOrderId?: string
        productionReportId?: string
        performedByUserId?: string
        notes?: string
        stage?: ProcessStage
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.PRODUCTION,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: quantityProduced,
        quantityAfter: quantityBefore + quantityProduced,
        ...options,
    })
}

export async function recordDeliveryMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityDelivered: number,
    quantityBefore: number,
    options: {
        spkId?: string
        salesOrderId?: string
        deliveryOrderId?: string
        palletId?: string
        performedByUserId?: string
        notes?: string
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.DELIVERY,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: -quantityDelivered,
        quantityAfter: quantityBefore - quantityDelivered,
        ...options,
    })
}

export async function recordAdjustmentMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityAdjustment: number,
    quantityBefore: number,
    options: {
        performedByUserId?: string
        notes?: string
        stage?: ProcessStage
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.ADJUSTMENT,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: quantityAdjustment,
        quantityAfter: quantityBefore + quantityAdjustment,
        ...options,
    })
}

export async function recordTransferMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    fromStorageId: string,
    toStorageId: string,
    quantityTransferred: number,
    quantityBeforeSource: number,
    quantityBeforeDestination: number,
    options: {
        spkId?: string
        performedByUserId?: string
        notes?: string
    } = {},
): Promise<{ sourceMutation: any; destinationMutation: any }> {
    const sourceMutation = await createStockMutation(prismaInstance, {
        type: MutationType.TRANSFER,
        itemId,
        storageId: fromStorageId,
        quantityBefore: quantityBeforeSource,
        quantityChange: -quantityTransferred,
        quantityAfter: quantityBeforeSource - quantityTransferred,
        ...options,
        notes: `Transfer OUT: ${options.notes || 'Stock transfer'}`,
    })

    const destinationMutation = await createStockMutation(prismaInstance, {
        type: MutationType.TRANSFER,
        itemId,
        storageId: toStorageId,
        quantityBefore: quantityBeforeDestination,
        quantityChange: quantityTransferred,
        quantityAfter: quantityBeforeDestination + quantityTransferred,
        ...options,
        notes: `Transfer IN: ${options.notes || 'Stock transfer'}`,
    })

    return { sourceMutation, destinationMutation }
}

export async function recordPalletMutation(
    prismaInstance: PrismaClient | PrismaTransaction,
    itemId: string,
    storageId: string,
    quantityTaken: number,
    quantityBefore: number,
    options: {
        spkId?: string
        salesOrderId?: string
        palletId?: string
        performedByUserId?: string
        notes?: string
        stage?: ProcessStage
    } = {},
): Promise<any> {
    return createStockMutation(prismaInstance, {
        type: MutationType.REDUCE_STOCK,
        itemId,
        storageId,
        quantityBefore,
        quantityChange: -quantityTaken,
        quantityAfter: quantityBefore - quantityTaken,
        ...options,
        notes: `Pallet creation - ${options.notes || 'Items moved to pallet'}`,
    })
}

