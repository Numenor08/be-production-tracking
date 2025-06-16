import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import {
    ProcessStage,
    PhaseStatus,
    OrderStatus,
    ProductionItem,
} from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generateSPKCode } from '../libs/generate'

const prisma = new PrismaClient()

/**
 * Get all production orders with pagination and filtering
 */
export const getAllSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        // Parse query parameters (validated by middleware)
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 25
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'desc'
        const status = req.query.status as OrderStatus | undefined
        const stage = req.query.stage as ProcessStage | undefined

        // Build where condition for filtering
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

        // Build orderBy for sorting
        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        // Get total count for pagination
        const totalCount = await prisma.sPK.count({ where })

        // Calculate pagination values
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch production orders with pagination
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
                        customerName: true,
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
                    select: {
                        id: true,
                        stage: true,
                        status: true,
                    },
                },
                productionItems: {
                    include: {
                        inputItem: true,
                        outputItem: true,
                    },
                },
                storageItems: {
                    select: {
                        id: true,
                        stock: true,
                        wasteStock: true,
                        item: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        // Calculate additional data for each SPK
        const enhancedOrders = spks.map((order) => {
            // Calculate phase completion percentages
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
                (progress.preprocess + progress.process + progress.finishing) /
                    3,
            )

            // Calculate item counts
            const inputItemCount =
                order.productionItems?.reduce(
                    (sum, item) => sum + item.inputQuantity,
                    0,
                ) || 0
            const outputItemCount =
                order.productionItems?.reduce(
                    (sum, item) => sum + item.outputQuantity,
                    0,
                ) || 0
            const storageItemCount =
                order.storageItems?.reduce(
                    (sum, item) => sum + item.stock,
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
            successResponse(
                enhancedOrders,
                'Production orders retrieved successfully',
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
        console.error('Error in getAllSPK:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve production orders'))
    }
}

/**
 * Get production order by ID with detailed information
 */
export const getSPKById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                salesOrder: true,
                preprocessMachine: true,
                processMachine: true,
                finishingMachine: true,
                phases: {
                    include: {
                        item: true,
                    },
                },
                productionItems: {
                    include: {
                        inputItem: true,
                        outputItem: true,
                    },
                },
                storageItems: {
                    include: {
                        item: true,
                    },
                },
                machineHistory: {
                    include: {
                        machine: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                report: {
                    include: {
                        reportItems: {
                            include: {
                                item: true,
                            },
                        },
                    },
                },
                palletItems: {
                    include: {
                        pallet: true,
                        storageItem: true,
                    },
                },
            },
        })

        if (!spk) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        // Calculate phase completion percentages
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

        // Prepare timeline data
        const timeline = [
            { stage: 'Created', date: spk.createdAt, completed: true },
            {
                stage: 'Preprocess Started',
                date: spk.preprocessStartDate,
                completed: !!spk.preprocessStartDate,
            },
            {
                stage: 'Process Started',
                date: spk.processStartDate,
                completed: !!spk.processStartDate,
            },
            {
                stage: 'Finishing Started',
                date: spk.finishingStartDate,
                completed: !!spk.finishingStartDate,
            },
            {
                stage: 'Completed',
                date: spk.report?.finishingCompletionDate || null,
                completed:
                    spk.preprocessStatus === PhaseStatus.COMPLETED &&
                    spk.processStatus === PhaseStatus.COMPLETED &&
                    spk.finishingStatus === PhaseStatus.COMPLETED,
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

/**
 * Create a new production order
 */
export const createSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            salesOrderId,
            preprocessMachineId,
            processMachineId,
            finishingMachineId,
            preprocessDeadline,
            processDeadline,
            finishingDeadline,
            productionItemsData = [],
        } = req.body

        // Check if salesOrder exists
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

        // Check if machines exist
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

        // Validate all items exist
        if (productionItemsData.length > 0) {
            const inputItemIds = productionItemsData.map(
                (item: ProductionItem) => item.inputItemId,
            )
            // Only include outputItemId if it exists (not undefined/null)
            const outputItemIds = productionItemsData
                .filter((item: ProductionItem) => !!item.outputItemId)
                .map((item: ProductionItem) => item.outputItemId as string)

            const allItemIds = [...new Set([...inputItemIds, ...outputItemIds])]

            if (allItemIds.length > 0) {
                const foundItems = await prisma.item.findMany({
                    where: { id: { in: allItemIds } },
                })

                if (foundItems.length !== allItemIds.length) {
                    return res
                        .status(400)
                        .json(errorResponse('One or more items not found'))
                }
            }
        }

        // Generate unique SPK code
        const code = await generateSPKCode()

        // Start a transaction to create the SPK and related records
        const result = await prisma.$transaction(async (tx) => {
            // Create the SPK
            const newSPK = await tx.sPK.create({
                data: {
                    code,
                    startStage: ProcessStage.PREPROCESS,
                    preprocessStatus: PhaseStatus.NOT_STARTED,
                    processStatus: PhaseStatus.NOT_STARTED,
                    finishingStatus: PhaseStatus.NOT_STARTED,
                    preprocessDeadline: preprocessDeadline
                        ? new Date(preprocessDeadline)
                        : null,
                    processDeadline: processDeadline
                        ? new Date(processDeadline)
                        : null,
                    finishingDeadline: finishingDeadline
                        ? new Date(finishingDeadline)
                        : null,
                    salesOrder: { connect: { id: salesOrderId } },
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

            // Create pr// First, track any created output IDs
            const createdOutputIds = new Map()

            // Create production items and track created output items
            if (productionItemsData.length > 0) {
                // First, fetch the sales order with its items for reference
                const salesOrderWithItems = await tx.salesOrder.findUnique({
                    where: { id: salesOrderId },
                    include: {
                        items: {
                            include: {
                                item: true,
                            },
                        },
                    },
                })

                for (const item of productionItemsData) {
                    let outputId = item.outputItemId

                    // If no output item ID is provided, create a new semi-finished item
                    if (!outputId && item.type === 'SEMI_FINISHED') {
                        const inputItem = await tx.item.findUnique({
                            where: { id: item.inputItemId },
                        })

                        // Try to find the corresponding product from the sales order items
                        let productName = `Unknown Product (${new Date().toISOString().split('T')[0]})`
                        if (salesOrderWithItems?.items) {
                            // Find a matching sales order item - this is a simplified match
                            // You might need more complex logic depending on how items are related
                            const matchingSalesItem =
                                salesOrderWithItems.items.find(
                                    (soi) =>
                                        // Match based on whatever criteria makes sense for your application
                                        // For example, this might be item type, name pattern, etc.
                                        soi.item?.type === 'PRODUCT' ||
                                        (inputItem &&
                                            soi.item?.name.includes(
                                                inputItem.name,
                                            )),
                                )

                            if (matchingSalesItem) {
                                productName = matchingSalesItem.item?.name ?? 'Unknown Product'
                            }
                        }

                        const newOutputItem = await tx.item.create({
                            data: {
                                name: `${productName} - Semi Finished'}`,
                                type: 'SEMI_FINISHED',
                            },
                        })

                        outputId = newOutputItem.id
                        // Store the created output ID for this input item
                        createdOutputIds.set(item.inputItemId, outputId)
                    }

                    await tx.productionItem.create({
                        data: {
                            spk: { connect: { id: newSPK.id } },
                            inputItem: {
                                connect: { id: item.inputItemId },
                            },
                            outputItem: {
                                connect: { id: outputId },
                            },
                            type: item.type,
                            inputQuantity: item.inputQuantity || 0,
                            outputQuantity: item.outputQuantity || 0,
                        },
                    })
                }
            }

            // Find a valid item ID to use for phases
            const firstItem = productionItemsData[0]
            let phaseItemId

            // First check if we have a direct output item ID
            if (firstItem?.outputItemId) {
                phaseItemId = firstItem.outputItemId
                // If not, check if we created one
            } else if (
                firstItem &&
                createdOutputIds.has(firstItem.inputItemId)
            ) {
                phaseItemId = createdOutputIds.get(firstItem.inputItemId)
                // As a last resort, use the input item ID
            } else if (firstItem) {
                phaseItemId = firstItem.inputItemId
                // If we have no items at all, find any suitable item
            } else {
                const anyItem = await tx.item.findFirst({
                    where: { type: 'SEMI_FINISHED' },
                })

                if (!anyItem) {
                    // Create a default item if needed
                    const defaultItem = await tx.item.create({
                        data: {
                            name: 'Default Production Item',
                            type: 'SEMI_FINISHED',
                        },
                    })
                    phaseItemId = defaultItem.id
                } else {
                    phaseItemId = anyItem.id
                }
            }

            // Create phases for the SPK
            await tx.sPK_Phase.createMany({
                data: [
                    {
                        spkId: newSPK.id,
                        stage: ProcessStage.PREPROCESS,
                        targetQuantity: calculateTotalQuantity(
                            productionItemsData,
                            'outputQuantity',
                        ),
                        plannedWaste: 0,
                        actualQuantity: 0,
                        actualWaste: 0,
                        storageUsed: 0,
                        itemId: phaseItemId,
                        status: PhaseStatus.NOT_STARTED,
                    },
                    {
                        spkId: newSPK.id,
                        stage: ProcessStage.PROCESS,
                        targetQuantity: calculateTotalQuantity(
                            productionItemsData,
                            'outputQuantity',
                        ),
                        plannedWaste: 0,
                        actualQuantity: 0,
                        actualWaste: 0,
                        storageUsed: 0,
                        itemId: phaseItemId,
                        status: PhaseStatus.NOT_STARTED,
                    },
                    {
                        spkId: newSPK.id,
                        stage: ProcessStage.FINISHING,
                        targetQuantity: calculateTotalQuantity(
                            productionItemsData,
                            'outputQuantity',
                        ),
                        plannedWaste: 0,
                        actualQuantity: 0,
                        actualWaste: 0,
                        storageUsed: 0,
                        itemId: phaseItemId,
                        status: PhaseStatus.NOT_STARTED,
                    },
                ],
            })

            // Update sales order status
            await tx.salesOrder.update({
                where: { id: salesOrderId },
                data: { status: OrderStatus.IN_PROGRESS },
            })

            // Record machine history if machines are assigned
            if (preprocessMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: preprocessMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        status: 0, // Initial status
                        details: `Assigned to SPK ${code} for preprocess stage`,
                    },
                })
            }

            if (processMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: processMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        status: 0, // Initial status
                        details: `Assigned to SPK ${code} for process stage`,
                    },
                })
            }

            if (finishingMachineId) {
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: finishingMachineId } },
                        spk: { connect: { id: newSPK.id } },
                        status: 0, // Initial status
                        details: `Assigned to SPK ${code} for finishing stage`,
                    },
                })
            }

            return newSPK
        })

        // Get the complete SPK with relations
        const completeSPK = await prisma.sPK.findUnique({
            where: { id: result.id },
            include: {
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
                    },
                },
                preprocessMachine: true,
                processMachine: true,
                finishingMachine: true,
                phases: true,
                productionItems: {
                    include: {
                        inputItem: true,
                        outputItem: true,
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

/**
 * Update an existing production order
 */
export const updateSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const {
            mesin_preprocess,
            mesin_process,
            mesin_finishing,
            tanggal_deadline_preprocess,
            tanggal_deadline_process,
            tanggal_deadline_finishing,
            status,
        } = req.body

        // Check if SPK exists
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

        // Check if machines exist
        if (mesin_preprocess) {
            const preprocessMachine = await prisma.machine.findUnique({
                where: { id: mesin_preprocess },
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

        if (mesin_process) {
            const processMachine = await prisma.machine.findUnique({
                where: { id: mesin_process },
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

        if (mesin_finishing) {
            const finishingMachine = await prisma.machine.findUnique({
                where: { id: mesin_finishing },
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

        // Start transaction for update
        const result = await prisma.$transaction(async (tx) => {
            // Update SPK
            const updateData: any = {}

            if (tanggal_deadline_preprocess) {
                updateData.preprocessDeadline = new Date(
                    tanggal_deadline_preprocess,
                )
            }

            if (tanggal_deadline_process) {
                updateData.processDeadline = new Date(tanggal_deadline_process)
            }

            if (tanggal_deadline_finishing) {
                updateData.finishingDeadline = new Date(
                    tanggal_deadline_finishing,
                )
            }

            if (status) {
                updateData.status = status
            }

            // Handle machine changes
            if (
                mesin_preprocess &&
                mesin_preprocess !== existingSPK.preprocessMachineId
            ) {
                updateData.preprocessMachine = {
                    connect: { id: mesin_preprocess },
                }

                // Add history record for new machine
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: mesin_preprocess } },
                        spk: { connect: { id } },
                        status: 0,
                        details: `Assigned to SPK ${existingSPK.code} for preprocess stage`,
                    },
                })
            }

            if (
                mesin_process &&
                mesin_process !== existingSPK.processMachineId
            ) {
                updateData.processMachine = { connect: { id: mesin_process } }

                // Add history record for new machine
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: mesin_process } },
                        spk: { connect: { id } },
                        status: 0,
                        details: `Assigned to SPK ${existingSPK.code} for process stage`,
                    },
                })
            }

            if (
                mesin_finishing &&
                mesin_finishing !== existingSPK.finishingMachineId
            ) {
                updateData.finishingMachine = {
                    connect: { id: mesin_finishing },
                }

                // Add history record for new machine
                await tx.machineHistory.create({
                    data: {
                        machine: { connect: { id: mesin_finishing } },
                        spk: { connect: { id } },
                        status: 0,
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

        // Get the updated SPK with relations
        const updatedCompleteSPK = await prisma.sPK.findUnique({
            where: { id: result.id },
            include: {
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
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

/**
 * Delete a production order
 */
export const deleteSPK = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        // Check if SPK exists
        const existingSPK = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: true,
                storageItems: true,
                palletItems: true,
            },
        })

        if (!existingSPK) {
            return res
                .status(404)
                .json(errorResponse('Production order not found'))
        }

        // Check if SPK has storage items or pallet items
        if (existingSPK.storageItems && existingSPK.storageItems.length > 0) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete production order with existing storage items',
                    {
                        storageItems: existingSPK.storageItems.map((item) => ({
                            id: item.id,
                        })),
                    },
                ),
            )
        }

        if (existingSPK.palletItems && existingSPK.palletItems.length > 0) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete production order with existing pallet items',
                    {
                        palletItems: existingSPK.palletItems.map((item) => ({
                            id: item.id,
                        })),
                    },
                ),
            )
        }

        // Start transaction for delete
        await prisma.$transaction(async (tx) => {
            // Delete related phases
            await tx.sPK_Phase.deleteMany({
                where: { spkId: id },
            })

            // Delete related machine history
            await tx.machineHistory.deleteMany({
                where: { spkId: id },
            })

            // Delete related production items
            await tx.productionItem.deleteMany({
                where: { spkId: id },
            })

            // Delete the SPK report if it exists
            await tx.report.deleteMany({
                where: { spkId: id },
            })

            // Delete the SPK itself
            await tx.sPK.delete({
                where: { id },
            })
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

export const updatePhaseProgress = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { stage, actualQuantity, actualWaste, status } = req.body

        // Validate stage value
        if (!Object.values(ProcessStage).includes(stage)) {
            return res
                .status(400)
                .json(errorResponse('Invalid production stage'))
        }

        // Check if SPK exists with the phase
        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                phases: {
                    where: { stage },
                },
            },
        })

        if (!spk) {
            return res.status(404).json(errorResponse('SPK not found'))
        }

        if (spk.phases.length === 0) {
            return res
                .status(404)
                .json(errorResponse(`No ${stage} phase found for this SPK`))
        }

        const phase = spk.phases[0]

        // Update SPK phase with actual progress
        const result = await prisma.$transaction(async (tx) => {
            // Update the phase
            const updatedPhase = await tx.sPK_Phase.update({
                where: { id: phase.id },
                data: {
                    actualQuantity:
                        actualQuantity !== undefined
                            ? actualQuantity
                            : phase.actualQuantity,
                    actualWaste:
                        actualWaste !== undefined
                            ? actualWaste
                            : phase.actualWaste,
                    status: status ? (status as PhaseStatus) : phase.status,
                },
            })

            // Update SPK status if needed
            if (status) {
                const spkUpdateData: any = {}

                switch (stage) {
                    case ProcessStage.PREPROCESS:
                        spkUpdateData.preprocessStatus = status
                        if (
                            status === PhaseStatus.ONGOING &&
                            !spk.preprocessStartDate
                        ) {
                            spkUpdateData.preprocessStartDate = new Date()
                        }
                        break
                    case ProcessStage.PROCESS:
                        spkUpdateData.processStatus = status
                        if (
                            status === PhaseStatus.ONGOING &&
                            !spk.processStartDate
                        ) {
                            spkUpdateData.processStartDate = new Date()
                        }
                        break
                    case ProcessStage.FINISHING:
                        spkUpdateData.finishingStatus = status
                        if (
                            status === PhaseStatus.ONGOING &&
                            !spk.finishingStartDate
                        ) {
                            spkUpdateData.finishingStartDate = new Date()
                        }
                        break
                }

                await tx.sPK.update({
                    where: { id },
                    data: spkUpdateData,
                })
            }

            // Return the updated phase
            return updatedPhase
        })

        return res.json(
            successResponse(
                result,
                `SPK phase ${stage} progress updated successfully`,
            ),
        )
    } catch (error) {
        console.error('Error in updatePhaseProgress:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to update phase progress'))
    }
}

/**
 * Helper function to calculate phase progress percentage
 */
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

/**
 * Helper function to calculate total quantity from SPK items
 */
function calculateTotalQuantity(items: any[], key: string): number {
    return items.reduce((total, item) => total + (item[key] || 0), 0)
}

export default {
    getAllSPK,
    getSPKById,
    createSPK,
    updateSPK,
    deleteSPK,
    updatePhaseProgress,
}
