import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllBarang = async (_req: Request, res: Response) => {
    try {
        const result = await prisma.barang.findMany({
            include: {
                Gudang: true,
            },
        })
        res.json(result)
    } catch {
        res.status(500).json({ error: 'Gagal mengambil data Barang' })
    }
}

export const getBarangById = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const result = await prisma.barang.findUnique({
            where: { id },
            include: {
                Gudang: true,
                salesOrders: true,
                SpkBarang: true,
            },
        })
        if (!result) {
            res.status(404).json({ error: 'Barang tidak ditemukan' })
        } else {
            res.json(result)
        }
    } catch {
        res.status(500).json({ error: 'Gagal mengambil data Barang' })
    }
}

export const createBarang = async (req: Request, res: Response) => {
    try {
        const { nama, tipe, harga } = req.body
        const result = await prisma.barang.create({
            data: { nama, tipe, harga },
        })
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal membuat Barang' })
    }
}

export const updateBarang = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const { nama, tipe, harga } = req.body

        const existing = await prisma.barang.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Barang tidak ditemukan' })
            return
        }

        const updated = await prisma.barang.update({
            where: { id },
            data: { nama, tipe, harga },
        })

        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal mengupdate Barang' })
    }
}

export const deleteBarang = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.barang.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Barang tidak ditemukan' })
            return
        }

        await prisma.barang.delete({ where: { id } })
        res.json({ message: 'Barang berhasil dihapus' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal menghapus Barang' })
    }
}

export default {
    getAllBarang,
    getBarangById,
    createBarang,
    updateBarang,
    deleteBarang,
}
