import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import {
    ProcessStage,
    PhaseStatus,
    OrderStatus,
    ItemType,
} from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import {
    generateSPKCode,
    generateItemCode,
} from '../libs/generate'
import { createProductionReport } from './report.controller'
import { reduceStockFromStorage, addStockToStorage } from './storage.controller'
import { recordReduceStockMutation } from '../utils/stockMutation.utils'

const prisma = new PrismaClient()

export const getAllSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 30
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'desc'
        const status = req.query.status as OrderStatus | undefined
        const stage = req.query.stage as ProcessStage | undefined

        const where: any = {}
        if (search) {
            where.OR = [{ code: { contains: search } }]
        }

        if (status) {
            where.status = status
        }

        if (stage) {
            where.startStage = stage
        }

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        const totalCount = await prisma.sPK.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const spks = await prisma.sPK.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                salesOrderItem: {
                    include: {
                        item: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
                preprocessMachine: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                processMachine: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                finishingMachine: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                phases: {
                    include: {
                        spkItems: {
                            include: {
                                outputItem: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                        price: true,
                                    },
                                },
                                inputItems: {
                                    include: {
                                        inputItem: {
                                            select: {
                                                id: true,
                                                name: true,
                                                type: true,
                                                price: true,
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

        const spkIds = spks.map((spk) => spk.id)
        const allSpkItems = await prisma.sPK_Item.findMany({
            where: { spkId: { in: spkIds } },
            include: {
                inputItems: true,
            },
        })
        const allStorageItems = await prisma.storage.findMany({
            where: { spkId: { in: spkIds } },
            select: {
                id: true,
                stock: true,
                spkId: true,
            },
        })

        const enhancedOrders = spks.map((order) => {
            const phases = order.phases || []
            const phasesByStage = {
                [ProcessStage.PREPROCESS]: phases.filter(
                    (p) => p.stage === ProcessStage.PREPROCESS,
                ),
                [ProcessStage.PROCESS]: phases.filter(
                    (p) => p.stage === ProcessStage.PROCESS,
                ),
                [ProcessStage.FINISHING]: phases.filter(
                    (p) => p.stage === ProcessStage.FINISHING,
                ),
            }

            const progress = {
                preprocess: calcPhaseProgress(
                    phasesByStage[ProcessStage.PREPROCESS].map((p) => ({
                        status: p.status as unknown as PhaseStatus,
                    })),
                ),
                process: calcPhaseProgress(
                    phasesByStage[ProcessStage.PROCESS].map((p) => ({
                        status: p.status as unknown as PhaseStatus,
                    })),
                ),
                finishing: calcPhaseProgress(
                    phasesByStage[ProcessStage.FINISHING].map((p) => ({
                        status: p.status as unknown as PhaseStatus,
                    })),
                ),
            }

            const overallProgress = Math.round(
                (progress.preprocess + progress.process + progress.finishing) /
                    3,
            )

            const spkItems = allSpkItems.filter(
                (item) => item.spkId === order.id,
            )
            const inputItemCount =
                spkItems.reduce((sum: number, item: any) => {
                    const inputQuantity =
                        item.inputItems?.reduce(
                            (inputSum: number, inputItem: any) =>
                                inputSum + (inputItem.inputQuantity || 0),
                            0,
                        ) || 0
                    return sum + inputQuantity
                }, 0) || 0

            const outputItemCount =
                spkItems.reduce(
                    (sum: number, item: any) =>
                        sum + (item.outputQuantity || 0),
                    0,
                ) || 0

            const storageItems = allStorageItems.filter(
                (item) => item.spkId === order.id,
            )
            const storageItemCount =
                storageItems.reduce(
                    (sum: number, item: any) => sum + (item.stock || 0),
                    0,
                ) || 0

            return {
                ...order,
                progress: {
                    preprocess: progress.preprocess,
                    process: progress.process,
                    finishing: progress.finishing,
                    overall: overallProgress,
                },
                itemCounts: {
                    inputItems: inputItemCount,
                    outputItems: outputItemCount,
                    storageItems: storageItemCount,
                },
            }
        })

        return res.json(
            successResponse(enhancedOrders, 'SPK retrieved successfully', {
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error in getAllSPK:', error)
        return res.status(500).json(errorResponse('Failed to retrieve SPK'))
    }
}

export const getSPKById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                salesOrder: {
                    select: {
                        code: true,
                        customer: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                phases: {
                    include: {
                        spkItems: {
                            include: {
                                outputItem: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                        price: true,
                                    },
                                },
                                inputItems: {
                                    include: {
                                        inputItem: {
                                            select: {
                                                id: true,
                                                name: true,
                                                type: true,
                                                price: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                preprocessMachine: {
                    select: { id: true, name: true, type: true, details: true },
                },
                processMachine: {
                    select: { id: true, name: true, type: true, details: true },
                },
                finishingMachine: {
                    select: { id: true, name: true, type: true, details: true },
                },
            },
        })

        if (!spk) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        const phases = spk.phases || []
        const phasesByStage = {
            [ProcessStage.PREPROCESS]: phases.filter(
                (p) => p.stage === ProcessStage.PREPROCESS,
            ),
            [ProcessStage.PROCESS]: phases.filter(
                (p) => p.stage === ProcessStage.PROCESS,
            ),
            [ProcessStage.FINISHING]: phases.filter(
                (p) => p.stage === ProcessStage.FINISHING,
            ),
        }

        const progress = {
            preprocess: calcPhaseProgress(
                phasesByStage[ProcessStage.PREPROCESS].map((p) => ({
                    status: p.status as PhaseStatus,
                })),
            ),
            process: calcPhaseProgress(
                phasesByStage[ProcessStage.PROCESS].map((p) => ({
                    status: p.status as PhaseStatus,
                })),
            ),
            finishing: calcPhaseProgress(
                phasesByStage[ProcessStage.FINISHING].map((p) => ({
                    status: p.status as PhaseStatus,
                })),
            ),
        }

        const overallProgress = Math.round(
            (progress.preprocess + progress.process + progress.finishing) / 3,
        )

        const preprocessPhase = phases.find(
            (p) => p.stage === ProcessStage.PREPROCESS,
        )
        const processPhase = phases.find(
            (p) => p.stage === ProcessStage.PROCESS,
        )
        const finishingPhase = phases.find(
            (p) => p.stage === ProcessStage.FINISHING,
        )

        const timeline = [
            { stage: 'Created', date: spk.createdAt, completed: true },
            {
                stage: 'Preprocess Started',
                date: preprocessPhase?.startDate || null,
                completed: !!preprocessPhase?.startDate,
            },
            {
                stage: 'Process Started',
                date: processPhase?.startDate || null,
                completed: !!processPhase?.startDate,
            },
            {
                stage: 'Finishing Started',
                date: finishingPhase?.startDate || null,
                completed: !!finishingPhase?.startDate,
            },
        ]

        const enhancedOrder = {
            ...spk,
            progress: {
                preprocess: progress.preprocess,
                process: progress.process,
                finishing: progress.finishing,
                overall: overallProgress,
            },
            timeline,
        }

        return res.json(
            successResponse(
                enhancedOrder,
                'Production order retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getSPKById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve production order'))
    }
}

export const createSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            salesOrderId,
            salesOrderItemId,
            preprocessMachineId,
            processMachineId,
            finishingMachineId,
            preprocessDeadline,
            processDeadline,
            finishingDeadline,
            targetQuantity,
        } = req.body

        const salesOrder = await prisma.salesOrder.findUnique({
            where: { id: salesOrderId },
            include: {
                items: {
                    include: {
                        item: true,
                    },
                },
            },
        })

        if (!salesOrder) {
            return res.status(404).json(errorResponse('Sales order not found'))
        }

        const salesOrderItem = salesOrder.items.find(
            (item) => item.id === salesOrderItemId,
        )
        if (!salesOrderItem) {
            return res
                .status(404)
                .json(errorResponse('Sales order item not found'))
        }

        if (targetQuantity > salesOrderItem.remainingQuantity) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        `Requested quantity ${targetQuantity} exceeds remaining quantity ${salesOrderItem.remainingQuantity} for item ${salesOrderItem.item ? salesOrderItem.item.name : `${salesOrderItem.itemId} (Item name not found)`}`,
                    ),
                )
        }

        if (preprocessMachineId) {
            const preprocessMachine = await prisma.machine.findUnique({
                where: { id: preprocessMachineId },
            })
            if (!preprocessMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Preprocess machine not found'))
            }
            if (preprocessMachine.type !== ProcessStage.PREPROCESS) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a preprocess machine',
                        ),
                    )
            }
        }

        if (processMachineId) {
            const processMachine = await prisma.machine.findUnique({
                where: { id: processMachineId },
            })
            if (!processMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Process machine not found'))
            }
            if (processMachine.type !== ProcessStage.PROCESS) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a process machine',
                        ),
                    )
            }
        }

        if (finishingMachineId) {
            const finishingMachine = await prisma.machine.findUnique({
                where: { id: finishingMachineId },
            })
            if (!finishingMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Finishing machine not found'))
            }
            if (finishingMachine.type !== ProcessStage.FINISHING) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a finishing machine',
                        ),
                    )
            }
        }

        const code = await generateSPKCode()

        let startStage = ProcessStage.PREPROCESS
        if (!preprocessMachineId && processMachineId) {
            startStage = ProcessStage.PROCESS
        } else if (
            !preprocessMachineId &&
            !processMachineId &&
            finishingMachineId
        ) {
            startStage = ProcessStage.FINISHING
        }

        const result = await prisma.$transaction(async (tx) => {
            const newSPK = await tx.sPK.create({
                data: {
                    salesOrder: { connect: { id: salesOrderId } },
                    salesOrderItem: { connect: { id: salesOrderItemId } },
                    code,
                    startStage,
                    targetQuantity,
                    preprocessDeadline: preprocessDeadline
                        ? new Date(preprocessDeadline)
                        : null,
                    processDeadline: processDeadline
                        ? new Date(processDeadline)
                        : null,
                    finishingDeadline: finishingDeadline
                        ? new Date(finishingDeadline)
                        : null,
                    preprocessMachine: preprocessMachineId
                        ? { connect: { id: preprocessMachineId } }
                        : undefined,
                    processMachine: processMachineId
                        ? { connect: { id: processMachineId } }
                        : undefined,
                    finishingMachine: finishingMachineId
                        ? { connect: { id: finishingMachineId } }
                        : undefined,
                },
            })

            await tx.salesOrderItem.update({
                where: { id: salesOrderItemId },
                data: {
                    remainingQuantity: { decrement: targetQuantity },
                },
            })

            const phasesToCreate = []

            if (preprocessMachineId) {
                phasesToCreate.push({
                    spkId: newSPK.id,
                    stage: ProcessStage.PREPROCESS,
                    status: PhaseStatus.NOT_STARTED,
                })
            }

            if (processMachineId) {
                phasesToCreate.push({
                    spkId: newSPK.id,
                    stage: ProcessStage.PROCESS,
                    status: PhaseStatus.NOT_STARTED,
                })
            }

            if (finishingMachineId) {
                phasesToCreate.push({
                    spkId: newSPK.id,
                    stage: ProcessStage.FINISHING,
                    status: PhaseStatus.NOT_STARTED,
                })
            }

            if (phasesToCreate.length > 0) {
                await tx.sPK_Phase.createMany({
                    data: phasesToCreate,
                })
            }

            await tx.salesOrder.update({
                where: { id: salesOrderId },
                data: { status: OrderStatus.IN_PROGRESS },
            })

            if (preprocessMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: preprocessMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        details: `Assigned to SPK ${code} for preprocess stage`,
                    },
                })
            }

            if (processMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: processMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        details: `Assigned to SPK ${code} for process stage`,
                    },
                })
            }

            if (finishingMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: finishingMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        details: `Assigned to SPK ${code} for finishing stage`,
                    },
                })
            }

            return newSPK
        })

        const completeSPK = await prisma.sPK.findUnique({
            where: { id: result.id },
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
                preprocessMachine: {
                    select: { id: true, name: true, type: true },
                },
                processMachine: {
                    select: { id: true, name: true, type: true },
                },
                finishingMachine: {
                    select: { id: true, name: true, type: true },
                },
                phases: {
                    include: {
                        spkItems: {
                            include: {
                                outputItem: {
                                    select: {
                                        id: true,
                                        code: true,
                                        name: true,
                                        type: true,
                                        price: true,
                                    },
                                },
                                inputItems: {
                                    include: {
                                        inputItem: {
                                            select: {
                                                id: true,
                                                code: true,
                                                name: true,
                                                type: true,
                                                price: true,
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

        return res
            .status(201)
            .json(
                successResponse(
                    completeSPK,
                    'Production order created successfully',
                ),
            )
    } catch (error) {
        console.error('Error in createSPK:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to create production order'))
    }
}

export const updateSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const {
            preprocessMachineId,
            processMachineId,
            finishingMachineId,
            preprocessDeadline,
            processDeadline,
            finishingDeadline,
            status,
        } = req.body

        const existingSPK = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: true,
                machineHistory: true,
            },
        })

        if (!existingSPK) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        if (preprocessMachineId) {
            const preprocessMachine = await prisma.machine.findUnique({
                where: { id: preprocessMachineId },
            })
            if (!preprocessMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Preprocess machine not found'))
            }
            if (preprocessMachine.type !== ProcessStage.PREPROCESS) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a preprocess machine',
                        ),
                    )
            }
        }

        if (processMachineId) {
            const processMachine = await prisma.machine.findUnique({
                where: { id: processMachineId },
            })
            if (!processMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Process machine not found'))
            }
            if (processMachine.type !== ProcessStage.PROCESS) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a process machine',
                        ),
                    )
            }
        }

        if (finishingMachineId) {
            const finishingMachine = await prisma.machine.findUnique({
                where: { id: finishingMachineId },
            })
            if (!finishingMachine) {
                return res
                    .status(404)
                    .json(errorResponse('Finishing machine not found'))
            }
            if (finishingMachine.type !== ProcessStage.FINISHING) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            'Selected machine is not a finishing machine',
                        ),
                    )
            }
        }

        const result = await prisma.$transaction(async (tx) => {
            const updateData: any = {}

            if (preprocessDeadline) {
                updateData.preprocessDeadline = new Date(
                    preprocessDeadline,
                )
            }

            if (processDeadline) {
                updateData.processDeadline = new Date(processDeadline)
            }

            if (finishingDeadline) {
                updateData.finishingDeadline = new Date(
                    finishingDeadline,
                )
            }

            if (status) {
                updateData.status = status
            }

            if (
                preprocessMachineId &&
                preprocessMachineId !== existingSPK.preprocessMachineId
            ) {
                updateData.preprocessMachine = {
                    connect: { id: preprocessMachineId },
                }

                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: preprocessMachineId } },
                        spk: { connect: { id } },
                        details: `Assigned to SPK ${existingSPK.code} for preprocess stage`,
                    },
                })
            }

            if (
                processMachineId &&
                processMachineId !== existingSPK.processMachineId
            ) {
                updateData.processMachine = { connect: { id: processMachineId } }

                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: processMachineId } },
                        spk: { connect: { id } },
                        details: `Assigned to SPK ${existingSPK.code} for process stage`,
                    },
                })
            }

            if (
                finishingMachineId &&
                finishingMachineId !== existingSPK.finishingMachineId
            ) {
                updateData.finishingMachine = {
                    connect: { id: finishingMachineId },
                }

                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: finishingMachineId } },
                        spk: { connect: { id } },
                        details: `Assigned to SPK ${existingSPK.code} for finishing stage`,
                    },
                })
            }

            const updatedSPK = await tx.sPK.update({
                where: { id },
                data: updateData,
            })

            return updatedSPK
        })

        const updatedCompleteSPK = await prisma.sPK.findUnique({
            where: { id: result.id },
            include: {
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
                preprocessMachine: true,
                processMachine: true,
                finishingMachine: true,
                phases: true,
            },
        })

        return res.json(
            successResponse(
                updatedCompleteSPK,
                'Production order updated successfully',
            ),
        )
    } catch (error) {
        console.error('Error in updateSPK:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update production order'))
    }
}

export const deleteSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const existingSPK = await prisma.sPK.findUnique({
            where: { id },
            include: {
                salesOrder: true,
                salesOrderItem: true,
                phases: true,
                storageItems: true,
                spkItems: {
                    include: {
                        outputItem: true,
                    },
                },
            },
        })

        if (!existingSPK) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        if (existingSPK.storageItems && existingSPK.storageItems.length > 0) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete production order with existing storage items',
                    {
                        storageItems: existingSPK.storageItems.map((item) => ({
                            id: item.id,
                        })),
                    },
                )
            )
        }

        const salesOrderId = existingSPK.salesOrder.id

        await prisma.$transaction(async (tx) => {
            await tx.salesOrderItem.update({
                where: {
                    id: existingSPK.salesOrderItemId,
                },
                data: {
                    remainingQuantity: {
                        increment: existingSPK.targetQuantity,
                    },
                    fullyPlanned: false,
                },
            })

            await tx.sPK.delete({
                where: { id },
            })

            const remainingSPKs = await tx.sPK.count({
                where: { salesOrderId: salesOrderId },
            })

            if (remainingSPKs === 0) {
                const salesOrder = await tx.salesOrder.findUnique({
                    where: { id: salesOrderId },
                    select: { status: true },
                })

                if (
                    salesOrder &&
                    salesOrder.status === OrderStatus.IN_PROGRESS
                ) {
                    await tx.salesOrder.update({
                        where: { id: salesOrderId },
                        data: { status: OrderStatus.IDLE },
                    })
                }
            }
        })

        return res.json(
            successResponse(null, 'Production order deleted successfully'),
        )
    } catch (error) {
        console.error('Error in deleteSPK:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to delete production order'))
    }
}

export const getSPKPhaseByStage = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { stage } = req.query

        const spkPhase = await prisma.sPK_Phase.findFirst({
            where: {
                spkId: id,
                stage: stage as ProcessStage,
            },
            include: {
                spkItems: {
                    include: {
                        outputItem: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                price: true,
                            },
                        },
                        inputItems: {
                            include: {
                                inputItem: {
                                    select: {
                                        id: true,
                                        name: true,
                                        type: true,
                                        price: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!spkPhase) {
            return res.status(404).json(errorResponse('SPK phase not found'))
        }

        return res.json(successResponse(spkPhase))
    } catch (error) {
        console.error('Error in getSPKPhaseById:', error)
        return res.status(500).json(errorResponse('Failed to get SPK phase'))
    }
}

export const startSPKPhase = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { stage } = req.body

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: {
                    where: { stage: stage },
                    include: {
                        spkItems: true,
                    },
                },
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        const existingPhase = spk.phases[0]
        if (!existingPhase) {
            return res
                .status(404)
                .json(errorResponse('Phase not found for this stage'))
        }

        if (
            existingPhase.status === PhaseStatus.ONGOING ||
            existingPhase.status === PhaseStatus.COMPLETED
        ) {
            return res
                .status(400)
                .json(errorResponse('Phase is already ongoing or completed'))
        }

        if (existingPhase.spkItems.length === 0) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Phase cannot be started while it has no SPK items',
                    ),
                )
        }

        const updatedPhase = await prisma.sPK_Phase.update({
            where: { id: existingPhase.id },
            data: {
                status: PhaseStatus.ONGOING,
                startDate: new Date(),
            },
        })

        return res.json(
            successResponse(updatedPhase, 'Phase started successfully'),
        )
    } catch (error: any) {
        console.error(error)
        return res.status(500).json(
            errorResponse('Failed to start SPK phase', {
                error: error.message,
            }),
        )
    }
}

export const completeSPKPhase = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { stage, spkItemsResult, notes, date } = req.body

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: {
                    include: {
                        spkItems: {
                            include: {
                                outputItem: true,
                                inputItems: {
                                    include: {
                                        inputItem: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        const currentPhase = spk.phases.find((p) => p.stage === stage)
        const currentStatus = currentPhase ? currentPhase.status : undefined

        if (currentStatus !== PhaseStatus.ONGOING) {
            return res
                .status(400)
                .json(errorResponse('Invalid status transition'))
        }

        const phase = spk.phases.find((p) => p.stage === stage)
        if (!phase) {
            return res
                .status(404)
                .json(errorResponse('Phase not found for this SPK'))
        }

        const updatedData = await prisma.$transaction(async (prisma) => {
            const updatedPhase = await prisma.sPK_Phase.update({
                where: {
                    spkId_stage: {
                        spkId: id,
                        stage: stage,
                    },
                },
                data: {
                    completionDate: date ? new Date(date) : new Date(),
                    status: PhaseStatus.COMPLETED,
                },
            })

            const {
                spkItemId,
                actualQuantity,
                actualWaste,
                storageUsed = 0,
                storageItemId = null,
            } = spkItemsResult

            const spkItem = phase.spkItems.find((item) => item.id === spkItemId)
            if (!spkItem) {
                throw new Error(`SPK item with ID ${spkItemId} not found`)
            }

            let combinedQuantity: number = actualQuantity + actualWaste

            if (storageUsed > 0 && storageItemId) {

                if( actualQuantity >= spkItem.targetOutputQuantity ) {
                    throw new Error(`Doesn't need to use storage, actual quantity ${actualQuantity} is greater than or equal to target output quantity ${spkItem.targetOutputQuantity}`)
                }
                
                const storage = await prisma.storage.findMany({
                    where: { itemId: storageItemId },
                })

                if (!storage) {
                    throw new Error(`Storage with itemID ${storageItemId} not found`)
                }

                const totalStorageStock = storage.reduce(
                    (acc, curr) => acc + curr.stock,
                    0
                )

                if (totalStorageStock < storageUsed) {
                    throw new Error(
                        `Not enough stock in storage. Available: ${totalStorageStock}, Requested: ${storageUsed}`,
                    )
                }

                let remainingToBorrow = storageUsed;
                for (const storagePerItem of storage) {
                    if (remainingToBorrow <= 0) break;
                    const available = storagePerItem.stock;
                    if (available <= 0) continue;

                    const toDecrement = Math.min(available, remainingToBorrow);
                    await prisma.storage.update({
                        where: { id: storagePerItem.id },
                        data: { stock: { decrement: toDecrement } },
                    });
                    remainingToBorrow -= toDecrement;
                }
                if (remainingToBorrow > 0) {
                    throw new Error(
                        `Not enough stock in storage. Still need: ${remainingToBorrow}`
                    );
                }
            }

            await prisma.sPK_Item.update({
                where: { id: spkItemId },
                data: {
                    outputQuantity: actualQuantity || 0,
                    wasteQuantity: actualWaste || 0,
                },
            })

            if (actualQuantity > 0 && spkItem.outputItemId) {
                const existingStorage = await prisma.storage.findFirst({
                    where: {
                        spkId: id,
                        itemId: spkItem.outputItemId,
                        spkStage: stage,
                    },
                })

                if (existingStorage) {
                    await prisma.storage.update({
                        where: { id: existingStorage.id },
                        data: {
                            stock: {
                                increment: combinedQuantity,
                            },
                        },
                    })
                } else {
                    await prisma.storage.create({
                        data: {
                            spkId: id,
                            itemId: spkItem.outputItemId,
                            spkStage: stage,
                            stock: combinedQuantity,
                        },
                    })
                }
            }

            const updatedSPK = await prisma.sPK.findUnique({
                where: { id },
                include: {
                    phases: true,
                    salesOrderItem: true,
                },
            })
            
            if (!updatedSPK) {
                throw new Error(`Cant update Sales Order Item, SPK with ID ${id} not found`)
            }

            if (updatedSPK.phases.every((p) => p.status === PhaseStatus.COMPLETED)) {
                let isFullyPlanned: boolean = false;
                let combinedQuantity: number = actualQuantity;

                if (combinedQuantity < updatedSPK.targetQuantity) {
                    combinedQuantity += actualWaste;
                } 
                if (combinedQuantity < updatedSPK.targetQuantity && storageUsed > 0) {
                    combinedQuantity += storageUsed;
                } else if (combinedQuantity > updatedSPK.targetQuantity) {
                    combinedQuantity = updatedSPK.targetQuantity;
                }

                if (combinedQuantity + updatedSPK.salesOrderItem.actualQuantity >= updatedSPK.salesOrderItem.targetQuantity) {
                    isFullyPlanned = true;
                }

                await prisma.salesOrderItem.update({
                    where: { id: updatedSPK.salesOrderItemId },
                    data: {
                        actualQuantity: combinedQuantity,
                        fullyPlanned: isFullyPlanned,
                    },
                })

                await prisma.salesOrder.update({
                    where: { id: updatedSPK.salesOrderId },
                    data: { status: OrderStatus.COMPLETED },
                })
            }

            const userId = (req.session as any)?.user?.id || null;
            await createProductionReport(
                prisma,
                spk.id,
                phase.id,
                spkItemId,
                stage,
                actualQuantity,
                actualWaste,
                storageUsed,
                userId,
                notes,
                date ? new Date(date) : new Date(),
            )
            
            return {
                updatedPhase,
                spkItems: spkItemsResult,
            }
        })

        return res.json(
            successResponse(updatedData, 'Phase progress updated successfully'),
        )
    } catch (error: any) {
        console.error(error)
        return res.status(500).json(
            errorResponse('Failed to update phase progress', {
                error: error.message,
            }),
        )
    }
}

export const deleteSPKPhase = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id, phaseId } = req.params

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: {
                    where: { id: phaseId },
                },
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        if (spk.phases.length === 0) {
            return res.status(404).json(errorResponse('SPK phase not found'))
        }

        const phase = spk.phases[0]

        if (phase.status === PhaseStatus.COMPLETED) {
            return res
                .status(400)
                .json(errorResponse('Cannot delete a completed phase'))
        }

        const updateData: any = {}

        switch (phase.stage) {
            case ProcessStage.PREPROCESS:
                updateData.preprocessStatus = PhaseStatus.SKIPPED
                updateData.preprocessMachineId = null
                break
            case ProcessStage.PROCESS:
                updateData.processStatus = PhaseStatus.SKIPPED
                updateData.processMachineId = null
                break
            case ProcessStage.FINISHING:
                updateData.finishingStatus = PhaseStatus.SKIPPED
                updateData.finishingMachineId = null
                break
        }

        await prisma.$transaction(async (tx) => {
            await tx.sPK_Phase.delete({
                where: { id: phaseId },
            })

            await tx.sPK.update({
                where: { id },
                data: updateData,
            })

            if (
                phase.stage === ProcessStage.PREPROCESS &&
                spk.preprocessMachineId
            ) {
                await tx.machineHistory.deleteMany({
                    where: {
                        machineId: spk.preprocessMachineId,
                        spkId: spk.id,
                    },
                })
            } else if (
                phase.stage === ProcessStage.PROCESS &&
                spk.processMachineId
            ) {
                await tx.machineHistory.deleteMany({
                    where: {
                        machineId: spk.processMachineId,
                        spkId: spk.id,
                    },
                })
            } else if (
                phase.stage === ProcessStage.FINISHING &&
                spk.finishingMachineId
            ) {
                await tx.machineHistory.deleteMany({
                    where: {
                        machineId: spk.finishingMachineId,
                        spkId: spk.id,
                    },
                })
            }
        })

        return res.json(successResponse(null, 'SPK phase deleted successfully'))
    } catch (error) {
        console.error('Error in deleteSPKPhase:', error)
        return res.status(500).json(errorResponse('Failed to delete SPK phase'))
    }
}

export const createSPKItem = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const {
            phaseId,
            outputItemId,
            type,
            stage,
            targetOutputQuantity,
            targetWasteQuantity = 0,
            inputItems = [],
        } = req.body

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: {
                    where: stage ? { stage } : {},
                },
                salesOrderItem: {
                    include: {
                        item: { select: { id: true, name: true, code: true } },
                    },
                },
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        let usedPhaseId = phaseId
        if (!phaseId && stage) {
            const existingPhase = spk.phases.find((p) => p.stage === stage)

            if (existingPhase) {
                usedPhaseId = existingPhase.id
            } else {
                return res
                    .status(404)
                    .json(
                        errorResponse(
                            `No phase found for ${stage} stage. Create the phase first.`,
                        ),
                    )
            }
        } else if (!phaseId) {
            return res
                .status(400)
                .json(errorResponse('Either phaseId or stage must be provided'))
        }

        if (phaseId && !spk.phases.some((p) => p.id === phaseId)) {
            return res
                .status(404)
                .json(
                    errorResponse(
                        `Provided phase not found in this SPK ${stage || 'stage'}`,
                    ),
                )
        }

        if (type === ItemType.MATERIAL) {
            return res.status(400).json(errorResponse('Invalid item type'))
        }

        if (type === ItemType.PRODUCT && stage === ProcessStage.PREPROCESS) {
            return res
                .status(400)
                .json(
                    errorResponse(
                        'Cannot create PRODUCT type item in PREPROCESS stage',
                    ),
                )
        }

        let finalOutputItemId: string | undefined

        if (!outputItemId) {
            const itemName = `${spk.salesOrderItem.item?.name || spk.code} - ${stage || 'ITEM'} - ${type}`

            const code = await generateItemCode(type as ItemType)

            const existingItem = await prisma.item.findUnique({
                where: { name: itemName },
            })

            if (existingItem) {
                finalOutputItemId = existingItem.id
            } else {
                const newItem = await prisma.item.create({
                    data: {
                        name: itemName,
                        type: type as ItemType,
                        code,
                    },
                })
                finalOutputItemId = newItem.id
            }

        } else {
            const outputItem = await prisma.item.findUnique({
                where: { id: outputItemId },
            })
            finalOutputItemId = outputItemId

            if (!outputItem) {
                return res
                    .status(404)
                    .json(errorResponse('Output item not found'))
            }
        }

        if (inputItems.length > 0) {
            const inputItemIds = inputItems.map((item: any) => item.inputItemId)

            const foundItems = await prisma.item.findMany({
                where: { id: { in: inputItemIds } },
            })

            if (foundItems.length !== inputItemIds.length) {
                return res
                    .status(400)
                    .json(errorResponse('One or more input items not found'))
            }

            if (foundItems.some((item) => item.type === ItemType.PRODUCT)) {
                return res
                    .status(400)
                    .json(
                        errorResponse('Input items cannot be of type PRODUCT'),
                    )
            }
        }

        for (const inputItem of inputItems) {
            const storageItem = await prisma.storage.findFirst({
                where: {
                    itemId: inputItem.inputItemId,
                    spkId: id,
                },
            })

            const fallbackStorageItem = !storageItem ? await prisma.storage.findFirst({
                where: {
                    itemId: inputItem.inputItemId,
                },
            }) : null

            const actualStorageItem = storageItem || fallbackStorageItem

            if (!actualStorageItem) {
                throw new Error(`Storage item not found for input item: ${inputItem.inputItemId}`)
            }

            try {
                await recordReduceStockMutation(
                    prisma,
                    inputItem.inputItemId,
                    actualStorageItem.id,
                    inputItem.inputQuantity,
                    actualStorageItem.stock,
                    {
                        spkId: id,
                        notes: `SPK item input material consumption - Phase ${stage || 'production'}`,
                        stage: stage as ProcessStage | undefined,
                    }
                )
            } catch (mutationError) {
                console.error('Error recording SPK input mutation:', mutationError)
            }

            const result = await reduceStockFromStorage(
                prisma,
                inputItem.inputItemId,
                inputItem.inputQuantity
            )

            if (!result.success) {
                return res
                    .status(400)
                    .json(
                        errorResponse(
                            `Failed to reduce stock for input item ${inputItem.inputItemId}: ${result.message}`,
                        ),
                    )
            }
        }

        const result = await prisma.$transaction(async (tx) => {
            const spkItem = await tx.sPK_Item.create({
                data: {
                    spkId: id,
                    phaseId: usedPhaseId,
                    type: type as ItemType,
                    targetOutputQuantity: targetOutputQuantity || 0,
                    targetWaste: targetWasteQuantity || 0,
                    outputQuantity: 0,
                    wasteQuantity: 0,
                    outputItemId: finalOutputItemId,
                },
            })

            if (inputItems.length > 0) {
                for (const inputItem of inputItems) {
                    await tx.sPK_InputItem.create({
                        data: {
                            spkItemId: spkItem.id,
                            inputItemId: inputItem.inputItemId,
                            inputQuantity: inputItem.inputQuantity || 0,
                        },
                    })
                }
            }

            return spkItem
        })

        const completeSpkItem = await prisma.sPK_Item.findUnique({
            where: { id: result.id },
            include: {
                outputItem: { select: { id: true, name: true, code: true } },
                inputItems: {
                    include: {
                        inputItem: {
                            select: { id: true, name: true, code: true },
                        },
                    },
                },
                phase: {
                    select: {
                        id: true,
                        stage: true,
                        status: true,
                        startDate: true,
                        completionDate: true,
                    },
                },
            },
        })

        return res
            .status(201)
            .json(
                successResponse(
                    completeSpkItem,
                    'SPK item created successfully',
                ),
            )
    } catch (error) {
        console.error('Error in createSPKItem:', error)
        return res.status(500).json(errorResponse('Failed to create SPK item'))
    }
}

function calcPhaseProgress(phases: { status: PhaseStatus }[]): number {
    if (!phases || phases.length === 0) {
        return 0
    }

    const completedPhases = phases.filter(
        (p) => p.status === PhaseStatus.COMPLETED,
    ).length
    const totalPhases = phases.length
    return Math.round((completedPhases / totalPhases) * 100)
}

export default {
    getAllSPK,
    createSPK,
    getSPKById,
    updateSPK,
    deleteSPK,
    getSPKPhaseByStage,
    startSPKPhase,
    completeSPKPhase,
    deleteSPKPhase,
    createSPKItem,
    calcPhaseProgress,
}

