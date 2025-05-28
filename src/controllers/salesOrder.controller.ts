import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllSalesOrders = async (_req: Request, res: Response) => {
    try {
        const salesOrders = await prisma.sales_Order.findMany()
        res.json(salesOrders)
    } catch {
        res.status(500).json({ error: 'gagal fetch sales order' })
    }
}

export const getSalesOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const salesOrder = await prisma.sales_Order.findUnique({
            where: { id },
            include: {
                Barang: true,
            },
        })

        if (!salesOrder) {
            res.status(404).json({ error: 'Sales order tidak di temukan' })
        } else {
            res.json(salesOrder)
        }
    } catch {
        res.status(500).json({ error: 'gagal fetch sales order' })
    }
}

export const createSalesOrder = async (req: Request, res: Response) => {
    try {
        const {
            nama_cust,
            total_harga,
            tanggal_selesai,
            tanggal_pengiriman,
            barangs,
        } = req.body

        const newOrder = await prisma.sales_Order.create({
            data: {
                nama_cust,
                total_harga,
                tanggal_selesai: new Date(tanggal_selesai),
                tanggal_pengiriman: new Date(tanggal_pengiriman),
                Barang: {
                    create: barangs.map(
                        (item: { barangId: string; quantity: number }) => ({
                            Barang: { connect: { id: item.barangId } },
                            quantity: item.quantity,
                        }),
                    ),
                },
            },
            include: {
                Barang: true,
            },
        })

        res.status(201).json(newOrder)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Gagal membuat Sales Order' })
    }
}

export const updateSalesOrder = async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params
        const {
            nama_cust,
            jumlah_product,
            total_harga,
            tanggal_selesai,
            tanggal_pengiriman,
            spkId,
        } = req.body

        const existing = await prisma.sales_Order.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Sales order tidak di temukan' })
            return
        }

        const updated = await prisma.sales_Order.update({
            where: { id },
            data: {
                nama_cust,
                total_harga,
                tanggal_selesai: new Date(tanggal_selesai),
                tanggal_pengiriman: new Date(tanggal_pengiriman),
            },
        })

        res.json(updated)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'gagal update sales order' })
    }
}

export const deleteSalesOrder = async (
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.params

        const existing = await prisma.sales_Order.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Sales order tidak di temukan' })
            return
        }

        await prisma.sales_Order.delete({ where: { id } })
        res.json({ message: 'Sales order deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'sales order gagal di hapus' })
    }
}

export default {
    getAllSalesOrders,
    getSalesOrderById,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
}
