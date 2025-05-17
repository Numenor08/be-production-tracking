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

export const createSalesOrder = async (req: Request, res: Response) => {
    const {
        id,
        productId,
        product_qty,
        price,
        customer_name,
        finish_date,
        delivery_date,
    } = req.body

    try {
        const productMaterials = await prisma.productMaterial.findMany({
            where: { productId },
            include: { material: true },
        })

        for (const pm of productMaterials) {
            const totalNeeded = pm.stock_needed * product_qty

            if (pm.material.stock < totalNeeded) {
                res.status(400).json({
                    error: `Stok material ${pm.material.material_name} tidak cukup. Dibutuhkan: ${totalNeeded}, tersedia: ${pm.material.stock}`,
                })
            }
        }

        const newSalesOrder = await prisma.sales_Order.create({
            data: {
                id,
                product_qty,
                customer_name,
                finish_date: new Date(finish_date),
                delivery_date: new Date(delivery_date),
            },
        })

        for (const pm of productMaterials) {
            const totalNeeded = pm.stock_needed * product_qty

            await prisma.material.update({
                where: { id: pm.materialId },
                data: {
                    stock: { decrement: totalNeeded },
                },
            })
        }

        const created = await prisma.salesOrderProduct.create({
            data: {
                salesOrderId: newSalesOrder.id,
                productId,
                product_qty: newSalesOrder.product_qty,
                price,
            },
        })

        res.status(201).json({
            salesOrder: newSalesOrder,
            salesOrderProduct: created,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Gagal membuat sales order' })
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
