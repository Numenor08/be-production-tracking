import { PrismaClient } from '../generated/prisma'
import { Request, Response } from 'express'
import { SalesOrderInput } from '../types'

const prisma = new PrismaClient()

export const getSalesOrders = async (req: Request, res: Response) => {
    try {
        const salesOrders = await prisma.sales_Order.findMany()
        res.json(salesOrders)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales orders' })
    }
}

const getSalesOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const salesOrder = await prisma.sales_Order.findUnique({
            where: { id },
        })

        if (!salesOrder) {
            res.status(404).json({ error: 'Sales order not found' })
            return
        }

        res.json(salesOrder)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales order' })
    }
}

const createSalesOrder = async (req: Request, res: Response) => {
    const data = req.body as SalesOrderInput

    try {
        const created = await prisma.sales_Order.create({
            data: {
                product_name: data.product_name,
                product_qty: data.product_qty,
                price: data.price,
                customer_name: data.customer_name,
                finish_date: new Date(data.finish_date),
                delivery_date: new Date(data.delivery_date),
            },
        })
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create sales order' })
    }
}

const updateSalesOrder = async (req: Request, res: Response) => {
    const data = req.body as Partial<SalesOrderInput>

    try {
        const id = req.params.id
        const updated = await prisma.sales_Order.update({
            where: { id },
            data: {
                ...data,
                finish_date: data.finish_date
                    ? new Date(data.finish_date)
                    : undefined,
                delivery_date: data.delivery_date
                    ? new Date(data.delivery_date)
                    : undefined,
            },
        })
        res.json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update sales order' })
    }
}

const deleteSalesOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await prisma.sales_Order.delete({ where: { id } })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete sales order' })
    }
}

export default {
    getSalesOrders,
    getSalesOrderById,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
}
