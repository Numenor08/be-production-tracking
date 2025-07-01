import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { successResponse, errorResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

export const getAllCustomers = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 25
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'

        const where: any = {}
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { code: { contains: search } },
                { contactPerson: { contains: search } },
                { email: { contains: search } },
                { phone: { contains: search } },
                { address: { contains: search } },
            ]
        }

        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.name = 'asc'
        }

        const totalCount = await prisma.customer.count({ where })

        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        const customers = await prisma.customer.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                _count: {
                    select: {
                        salesOrders: true,
                    },
                },
            },
        })

        const enhancedCustomers = customers.map((customer) => ({
            ...customer,
            salesOrderCount: customer._count.salesOrders,
            _count: undefined,
        }))

        return res.json(
            successResponse(
                enhancedCustomers,
                'Customers retrieved successfully',
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
        console.error('Error in getAllCustomers:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve customers'))
    }
}

export const getCustomerById = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const customer = await prisma.customer.findUnique({
            where: { id },
            include: {
                salesOrders: {
                    select: {
                        id: true,
                        code: true,
                        totalPrice: true,
                        status: true,
                        completionDate: true,
                        deliveryDate: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        })

        if (!customer) {
            return res.status(404).json(errorResponse('Customer not found'))
        }

        return res.json(
            successResponse(customer, 'Customer retrieved successfully'),
        )
    } catch (error) {
        console.error('Error in getCustomerById:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve customer'))
    }
}

export const createCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { name, address, phone, email, contactPerson } = req.body

        const customer = await prisma.customer.create({
            data: {
                name,
                address: address || null,
                phone: phone || null,
                email: email || null,
                contactPerson: contactPerson || null,
            },
        })

        return res
            .status(201)
            .json(successResponse(customer, 'Customer created successfully'))
    } catch (error) {
        console.error('Error in createCustomer:', error)
        return res.status(500).json(errorResponse('Failed to create customer'))
    }
}

export const updateCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { name, address, phone, email, contactPerson } = req.body

        const existingCustomer = await prisma.customer.findUnique({
            where: { id },
        })

        if (!existingCustomer) {
            return res.status(404).json(errorResponse('Customer not found'))
        }

        const updatedCustomer = await prisma.customer.update({
            where: { id },
            data: {
                name: name !== undefined ? name : undefined,
                address: address !== undefined ? address : undefined,
                phone: phone !== undefined ? phone : undefined,
                email: email !== undefined ? email : undefined,
                contactPerson:
                    contactPerson !== undefined ? contactPerson : undefined,
            },
        })

        return res.json(
            successResponse(updatedCustomer, 'Customer updated successfully'),
        )
    } catch (error) {
        console.error('Error in updateCustomer:', error)
        return res.status(500).json(errorResponse('Failed to update customer'))
    }
}

export const deleteCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        const existingCustomer = await prisma.customer.findUnique({
            where: { id },
            include: {
                salesOrders: true,
            },
        })

        if (!existingCustomer) {
            return res.status(404).json(errorResponse('Customer not found'))
        }

        if (existingCustomer.salesOrders.length > 0) {
            return res.status(400).json(
                errorResponse('Cannot delete customer with associated orders', {
                    salesOrdersCount: existingCustomer.salesOrders.length,
                }),
            )
        }

        await prisma.customer.delete({
            where: { id },
        })

        return res.json(successResponse(null, 'Customer deleted successfully'))
    } catch (error) {
        console.error('Error in deleteCustomer:', error)
        return res.status(500).json(errorResponse('Failed to delete customer'))
    }
}

export const getCustomerStatistics = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const totalCustomers = await prisma.customer.count()

        const customersWithOrders = await prisma.customer.count({
            where: {
                salesOrders: {
                    some: {},
                },
            },
        })


        const topCustomersByOrderCount = await prisma.customer.findMany({
            take: 5,
            orderBy: {
                salesOrders: {
                    _count: 'desc',
                },
            },
            include: {
                _count: {
                    select: {
                        salesOrders: true,
                    },
                },
            },
        })

        const statistics = {
            totalCustomers,
            customersWithOrders,
            topCustomers: topCustomersByOrderCount.map((c) => ({
                id: c.id,
                name: c.name,
                orderCount: c._count.salesOrders,
            })),
        }

        return res.json(
            successResponse(
                statistics,
                'Customer statistics retrieved successfully',
            ),
        )
    } catch (error) {
        console.error('Error in getCustomerStatistics:', error)
        return res
            .status(500)
            .json(errorResponse('Failed to retrieve customer statistics'))
    }
}

export default {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerStatistics,
}

