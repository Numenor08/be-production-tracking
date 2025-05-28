import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllHistoriMesin = async (_req: Request, res: Response) => {
    try {
        const histori = await prisma.historiMesin.findMany({
            include: {
                Mesin: true,
                SPK: true,
            },
        })
        res.json(histori)
    } catch {
        res.status(500).json({ error: 'Data histori mesin gagal diambil' })
    }
}

export const getHistoriMesinById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const histori = await prisma.historiMesin.findUnique({
            where: { id },
            include: {
                Mesin: true,
                SPK: true,
            },
        })

        if (!histori) {
            res.status(404).json({ error: 'Histori mesin tidak ditemukan' })
        } else {
            res.json(histori)
        }
    } catch {
        res.status(500).json({ error: 'Gagal mengambil histori mesin' })
    }
}

export const createHistoriMesin = async (req: Request, res: Response) => {
    try {
        const { mesinId, sPKId, status, detail } = req.body

        const newHistori = await prisma.historiMesin.create({
            data: {
                mesinId,
                sPKId,
                status,
                detail,
            },
        })

        res.status(201).json(newHistori)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'Gagal membuat histori mesin (kemungkinan kombinasi duplikat)',
        })
    }
}

export const updateHistoriMesin = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const { mesinId, sPKId, status, detail } = req.body

        const existing = await prisma.historiMesin.findUnique({ where: { id } })

        if (!existing) {
            res.status(404).json({ error: 'Histori mesin tidak ditemukan' })
            return
        }

        const updated = await prisma.historiMesin.update({
            where: { id },
            data: {
                mesinId,
                sPKId,
                status,
                detail,
            },
        })

        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal memperbarui histori mesin' })
    }
}

export const deleteHistoriMesin = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.historiMesin.findUnique({ where: { id } })

        if (!existing) {
            res.status(404).json({ error: 'Histori mesin tidak ditemukan' })
            return
        }

        await prisma.historiMesin.delete({ where: { id } })
        res.json({ message: 'Histori mesin berhasil dihapus' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal menghapus histori mesin' })
    }
}

export default {
    getAllHistoriMesin,
    getHistoriMesinById,
    createHistoriMesin,
    updateHistoriMesin,
    deleteHistoriMesin,
}
