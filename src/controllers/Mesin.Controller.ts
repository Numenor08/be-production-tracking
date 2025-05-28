import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllMesins = async (_req: Request, res: Response) => {
    try {
        const mesins = await prisma.mesin.findMany({
            include: { HistoriMesin: true },
        })
        res.json(mesins)
    } catch {
        res.status(500).json({ error: 'Gagal Fetch List Mesin' })
    }
}

export const getMesinById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const mesin = await prisma.mesin.findUnique({
            where: { id },
            include: { HistoriMesin: true },
        })

        if (!mesin) {
            res.status(404).json({ error: 'Mesin Tidak di temukan' })
        } else {
            res.json(mesin)
        }
    } catch {
        res.status(500).json({ error: 'gagal fetch mesin' })
    }
}

export const createMesin = async (req: Request, res: Response) => {
    try {
        const { Nama, Detail } = req.body

        const mesin = await prisma.mesin.create({
            data: { Nama, Detail },
        })

        res.status(201).json(mesin)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'gagal masukan mesin' })
    }
}

export const updateMesin = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const { Nama, Detail } = req.body

        const existing = await prisma.mesin.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Mesin tidak di temukan' })
            return
        }

        const updated = await prisma.mesin.update({
            where: { id },
            data: { Nama, Detail },
        })

        res.json(updated)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Gagal Update Mesin' })
    }
}

export const deleteMesin = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.mesin.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Mesin tidak di temukan' })
            return
        }

        await prisma.mesin.delete({ where: { id } })
        res.json({ message: 'Mesin berhasil di hapus' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'gagal hapus mesin' })
    }
}

export default {
    getAllMesins,
    getMesinById,
    createMesin,
    updateMesin,
    deleteMesin,
}
