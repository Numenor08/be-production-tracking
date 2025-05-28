import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllLaporan = async (_req: Request, res: Response) => {
    try {
        const result = await prisma.laporan.findMany({
            include: { spk: true },
        })
        res.json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal mengambil data Laporan' })
    }
}

export const getLaporanById = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const result = await prisma.laporan.findUnique({
            where: { id },
            include: {
                spk: true,
                LaporanBarang: {
                    include: {
                        barang: true,
                    },
                },
            },
        })
        if (!result) {
            res.status(404).json({ error: 'Laporan tidak ditemukan' })
        } else {
            res.json(result)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal mengambil data Laporan' })
    }
}

export const createLaporan = async (req: Request, res: Response) => {
    try {
        const { spkId, laporanBarang = [] } = req.body

        const spkBarangs = await prisma.spkBarang.findMany({
            where: { spkId },
            select: { barangId: true, tipe: true },
        })

        console.log('spkBarangs:', spkBarangs)

        const allowedBarangIds = spkBarangs.map((b) => b.barangId)
        const laporanBarangFiltered = laporanBarang.filter(
            (item: { barangId: string }) =>
                allowedBarangIds.includes(item.barangId),
        )

        console.log(allowedBarangIds)

        console.log('laporanBarangFiltered:', laporanBarangFiltered)

        const result = await prisma.$transaction(async (tx) => {
            const laporan = await tx.laporan.create({
                data: {
                    spk: { connect: { id: spkId } },
                    LaporanBarang: {
                        create: laporanBarangFiltered.map(
                            (item: { barangId: string; quantity: number }) => {
                                const spkBarang = spkBarangs.find(
                                    (b) => b.barangId === item.barangId,
                                )
                                return {
                                    barang: { connect: { id: item.barangId } },
                                    quantity: item.quantity,
                                    tipe: spkBarang?.tipe,
                                }
                            },
                        ),
                    },
                },
                include: {
                    LaporanBarang: true,
                },
            })

            for (const item of laporanBarangFiltered) {
                const existingGudang = await tx.gudang.findFirst({
                    where: {
                        spkId,
                        barangId: item.barangId,
                    },
                })
                if (!existingGudang) {
                    await tx.gudang.create({
                        data: {
                            spkId,
                            barangId: item.barangId,
                            Stock: item.quantity,
                        },
                    })
                } else {
                    await tx.gudang.update({
                        where: { id: existingGudang.id },
                        data: { Stock: item.quantity },
                    })
                }
            }

            return laporan
        })

        res.status(201).json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal membuat Laporan' })
    }
}

export const updateLaporan = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params
        const { tanggal_selesai, qty_preprocess, qty_process, qty_finishing } =
            req.body

        const existing = await prisma.laporan.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Laporan tidak ditemukan' })
            return
        }

        const updated = await prisma.laporan.update({
            where: { id },
            data: {},
        })

        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal mengupdate Laporan' })
    }
}

export const deleteLaporan = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const { id } = req.params

        const existing = await prisma.laporan.findUnique({ where: { id } })
        if (!existing) {
            res.status(404).json({ error: 'Laporan tidak ditemukan' })
            return
        }

        await prisma.laporan.delete({ where: { id } })
        res.json({ message: 'Laporan berhasil dihapus' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Gagal menghapus Laporan' })
    }
}

export default {
    getAllLaporan,
    getLaporanById,
    createLaporan,
    updateLaporan,
    deleteLaporan,
}
