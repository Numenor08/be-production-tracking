import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { ProcessStage } from '../types/types'
import { successResponse, errorResponse } from '../utils/api.utils'
import { generateMachineCode } from '../libs/generate'

const prisma = new PrismaClient()

export const getAllMachines = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 30
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'
        const type = req.query.type as ProcessStage | undefined

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

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.createdAt = 'desc'
        }

        const totalCount = await prisma.machine.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const machines = await prisma.machine.findMany({
            where,
            orderBy,
            skip,
            take: limit,
        })

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

export const getMachineById = async (
    req: Request,
    res: Response,
): Promise<any> => {
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

export const createMachine = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { name, details, type } = req.body

        const existingMachine = await prisma.machine.findFirst({
            where: { name },
        })
        
        if (existingMachine) {
            return res.status(400).json(
                errorResponse('Machine with this name already exists'),
            )
        }
        
        const code = await generateMachineCode(type as ProcessStage)
        const machine = await prisma.machine.create({
            data: {
                code,
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

export const updateMachine = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { name, details, type } = req.body

        const nameExists = await prisma.machine.findFirst({
            where: { name, id: { not: id } },
        })
        
        if (nameExists) {
            return res.status(400).json(
                errorResponse('Machine with this name already exists'),
            )
        }
        
        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

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

export const deleteMachine = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

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

        await prisma.machine.delete({ where: { id } })

        res.json(successResponse(null, 'Machine deleted successfully'))
    } catch (error) {
        console.error('Error in deleteMachine:', error)
        res.status(500).json(errorResponse('Failed to delete machine'))
    }
}

export const getMachineStats = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existing = await prisma.machine.findUnique({ where: { id } })
        if (!existing) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        const history = await prisma.machineHistory.findMany({
            where: { machineId: id },
            include: {
                spk: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

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
                salesOrder: {
                    select: {
                        id: true,
                        code: true,
                    },
                },
            },
        })

        const totalJobs = history.length

        const statsData = {
            machine: existing,
            stats: {
                totalJobs,
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

export const getMachineHistory = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const machine = await prisma.machine.findUnique({
            where: { id },
        })

        if (!machine) {
            return res.status(404).json(errorResponse('Machine not found'))
        }

        const totalCount = await prisma.machineHistory.count({
            where: { machineId: id },
        })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const history = await prisma.machineHistory.findMany({
            where: { machineId: id },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
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

        return res.json(
            successResponse(history, 'Machine history retrieved successfully', {
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                },
            }),
        )
    } catch (error) {
        console.error('Error in getMachineHistory:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve machine history'))
    }
}

export default {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine,
    getMachineStats,
    getMachineHistory,
}

