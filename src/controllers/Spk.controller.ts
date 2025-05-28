import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllSPK = async (_req: Request, res: Response) => {
    try {
        const spks = await prisma.sPK.findMany()
        res.json(spks)
    } catch {
        res.status(500).json({ error: 'Data SPK gagal diambil' })
    }
}

export const getSPKById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const spk = await prisma.sPK.findUnique({
            where: { id },
            include: {
                gudangs: true,
                SPKBarangs: true,
            },
        })

        if (!spk) {
            res.status(404).json({ error: 'SPK tidak ditemukan' })
        } else {
            res.json(spk)
        }
    } catch {
        res.status(500).json({ error: 'Gagal mengambil data SPK' })
    }
}

export const createSPK = async (req: Request, res: Response) => {
    const {
        mesin_preprocess,
        mesin_process,
        mesin_finishing,
        salesOrderId,
        tanggal_selesai_preprocess,
        tanggal_selesai_process,
        tanggal_selesai_finishing,
        spkBarangData = [],
    } = req.body

    try {
        const result = await prisma.$transaction(async (tx) => {
            const newSPK = await tx.sPK.create({
                data: {
                    tanggal_selesai_preprocess: new Date(
                        tanggal_selesai_preprocess,
                    ),
                    tanggal_selesai_process: new Date(tanggal_selesai_process),
                    tanggal_selesai_finishing: new Date(
                        tanggal_selesai_finishing,
                    ),
                    salesOrderId,
                    mesin_preprocess,
                    mesin_process,
                    mesin_finishing,
                },
            })

            if (spkBarangData.length > 0) {
                console.log('spkBarangData:', spkBarangData)
                await tx.spkBarang.createMany({
                    data: spkBarangData.map(
                        (item: {
                            barangId: string
                            quantity: number
                            tipe: number
                        }) => ({
                            spkId: newSPK.id,
                            barangId: item.barangId,
                            quantity: item.quantity,
                            tipe: item.tipe,
                        }),
                    ),
                })
            }

            return newSPK
        })

        res.status(201).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Gagal membuat SPK dan menghubungkan entitas',
        })
    }
}

export const updateSPK = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.sPK.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'SPK tidak ditemukan' })
            return
        }

        const updated = await prisma.sPK.update({
            where: { id },
            data: {}, // Tambahkan field yang bisa diupdate jika ada
        })

        res.json(updated)
    } catch {
        res.status(500).json({ error: 'Gagal mengupdate SPK' })
    }
}

export const deleteSPK = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.sPK.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'SPK tidak ditemukan' })
            return
        }

        await prisma.sPK.delete({ where: { id } })
        res.json({ message: 'SPK berhasil dihapus' })
    } catch {
        res.status(500).json({ error: 'Gagal menghapus SPK' })
    }
}

export default {
    getAllSPK,
    getSPKById,
    createSPK,
    updateSPK,
    deleteSPK,
}
