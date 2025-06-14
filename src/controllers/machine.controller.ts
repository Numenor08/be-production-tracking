import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { ProcessStage } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

// Get all machines with pagination and filtering
export const getAllMachines = async (req: Request, res: Response): Promise<any> => {
    try {
        // Parse query parameters (validated by middleware)
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'
        const type = req.query.type as ProcessStage | undefined

        // Build where condition for filtering
        const where: any = {}
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { details: { contains: search } },
            ]
        }

        if (type) {
            where.type = type
        }

        // Build orderBy for sorting
        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        // Get total count for pagination
        const totalCount = await prisma.machine.count({ where })

        // Calculate pagination values
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch machines with pagination and relation data
        const machines = await prisma.machine.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                history: true,
                preprocessOrders: {
                    select: { id: true, code: true },
                },
                processOrders: {
                    select: { id: true, code: true },
                },
                finishingOrders: {
                    select: { id: true, code: true },
                },
            },
        })

        // Format response using utility
        res.json(
            successResponse(machines, 'Machines retrieved successfully', {
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error in getAllMachines:', error)
        res.status(500).json(errorResponse('Failed to retrieve machines'))
    }
}

// Get machine by ID
export const getMachineById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const machine = await prisma.machine.findUnique({
            where: { id },
            include: {
                history: true,
                preprocessOrders: true,
                processOrders: true,
                finishingOrders: true,
            },
        })

        if (!machine) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        res.json(successResponse(machine, 'Machine retrieved successfully'))
    } catch (error) {
        console.error('Error in getMachineById:', error)
        res.status(500).json(errorResponse('Failed to retrieve machine'))
    }
}

// Create new machine
export const createMachine = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, details, type } = req.body

        const machine = await prisma.machine.create({
            data: {
                name,
                details,
                type: type as ProcessStage,
            },
        })

        res.status(201).json(
            successResponse(machine, 'Machine created successfully'),
        )
    } catch (error) {
        console.error('Error in createMachine:', error)
        res.status(500).json(errorResponse('Failed to create machine'))
    }
}

// Update machine
export const updateMachine = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { name, details, type } = req.body

        // Check if machine exists
        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        // Update machine
        const updated = await prisma.machine.update({
            where: { id },
            data: {
                name,
                details,
                type: type as ProcessStage,
            },
        })

        res.json(successResponse(updated, 'Machine updated successfully'))
    } catch (error) {
        console.error('Error in updateMachine:', error)
        res.status(500).json(errorResponse('Failed to update machine'))
    }
}

// Delete machine
export const deleteMachine = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        // Check if machine exists
        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        // Check if machine is being used by any production order
        const usedByProductionOrder = await prisma.sPK.findFirst({
            where: {
                OR: [
                    { preprocessMachineId: id },
                    { processMachineId: id },
                    { finishingMachineId: id },
                ],
            },
        })

        if (usedByProductionOrder) {
            return res.status(400).json(
                errorResponse(
                    'Cannot delete machine that is being used by production orders',
                    {
                        productionOrderId: usedByProductionOrder.id,
                        productionOrderCode: usedByProductionOrder.code,
                    },
                ),
            )
        }

        // Delete machine
        await prisma.machine.delete({ where: { id } })

        res.json(successResponse(null, 'Machine deleted successfully'))
    } catch (error) {
        console.error('Error in deleteMachine:', error)
        res.status(500).json(errorResponse('Failed to delete machine'))
    }
}

// Get machine usage statistics
export const getMachineStats = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        // Check if machine exists
        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        // Get machine history
        const history = await prisma.machineHistory.findMany({
            where: { machineId: id },
            include: {
                spk: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Get production orders
        const productionOrders = await prisma.sPK.findMany({
            where: {
                OR: [
                    { preprocessMachineId: id },
                    { processMachineId: id },
                    { finishingMachineId: id },
                ],
            },
            select: {
                id: true,
                code: true,
                startStage: true,
                preprocessStatus: true,
                processStatus: true,
                finishingStatus: true,
                preprocessStartDate: true,
                processStartDate: true,
                finishingStartDate: true,
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                        customerName: true,
                    },
                },
            },
        })

        // Calculate statistics
        const completedJobs = history.filter((h) => h.status === 2).length
        const totalJobs = history.length

        const statsData = {
            machine: existing,
            stats: {
                totalJobs,
                completedJobs,
                completionRate:
                    totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0,
            },
            recentHistory: history.slice(0, 5),
            productionOrders,
        }

        res.json(
            successResponse(
                statsData,
                'Machine statistics retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getMachineStats:', error)
        res.status(500).json(
            errorResponse('Failed to retrieve machine statistics'),
        )
    }
}

export default {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine,
    getMachineStats,
}
