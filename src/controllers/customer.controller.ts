import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'
import { successResponse, errorResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

// Get all customers with pagination and filtering
export const getAllCustomers = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        // Parse query parameters
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 25
        const search = req.query.search as string | undefined
        const sortBy = req.query.sortBy as string | undefined
        const sortOrder =
            (req.query.sortOrder as 'asc' | 'desc' | undefined) || 'asc'

        // Build where condition for filtering
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

        // Build orderBy for sorting
        const orderBy: any = {}
        if (sortBy) {
            orderBy[sortBy] = sortOrder
        } else {
            orderBy.name = 'asc'
        }

        // Get total count for pagination
        const totalCount = await prisma.customer.count({ where })

        // Calculate pagination values
        const totalPages = Math.ceil(totalCount / limit)
        const skip = (page - 1) * limit

        // Fetch customers with pagination
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

        // Add order counts to each customer
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

// Get customer by ID with detailed information
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

// Create a new customer
export const createCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { name, address, phone, email, contactPerson } = req.body

        // Create new customer
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

// Update an existing customer
export const updateCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params
        const { name, address, phone, email, contactPerson } = req.body

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id },
        })

        if (!existingCustomer) {
            return res.status(404).json(errorResponse('Customer not found'))
        }

        // Update customer
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

// Delete a customer
export const deleteCustomer = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        const { id } = req.params

        // Check if customer exists
        const existingCustomer = await prisma.customer.findUnique({
            where: { id },
            include: {
                salesOrders: true,
            },
        })

        if (!existingCustomer) {
            return res.status(404).json(errorResponse('Customer not found'))
        }

        // Check if customer has associated orders
        if (existingCustomer.salesOrders.length > 0) {
            return res.status(400).json(
                errorResponse('Cannot delete customer with associated orders', {
                    salesOrdersCount: existingCustomer.salesOrders.length,
                }),
            )
        }

        // Delete customer
        await prisma.customer.delete({
            where: { id },
        })

        return res.json(successResponse(null, 'Customer deleted successfully'))
    } catch (error) {
        console.error('Error in deleteCustomer:', error)
        return res.status(500).json(errorResponse('Failed to delete customer'))
    }
}

// Get customer statistics
export const getCustomerStatistics = async (
    req: Request,
    res: Response,
): Promise<any> => {
    try {
        // Get total customer count
        const totalCustomers = await prisma.customer.count()

        // Get customers with orders
        const customersWithOrders = await prisma.customer.count({
            where: {
                salesOrders: {
                    some: {},
                },
            },
        })

        // Get customers with deliveries
        // const customersWithDeliveries = await prisma.customer.count({
        //     where: {
        //         deliveryOrders: {
        //             some: {},
        //         },
        //     },
        // })

        // Get top customers by sales order count
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

        // Format the results
        const statistics = {
            totalCustomers,
            customersWithOrders,
            // customersWithDeliveries,
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
