import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllGudang = async (_req: Request, res: Response) => {
    try {
        const gudangs = await prisma.gudang.findMany()
        res.json(gudangs)
    } catch {
        res.status(500).json({ error: 'Item Dalam Gudang Gagal Di ambil' })
    }
}

export const getGudangById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const gudang = await prisma.gudang.findUnique({ where: { id } })

        if (!gudang) {
            res.status(404).json({ error: 'Item Tidak Di temukan' })
        } else {
            res.json(gudang)
        }
    } catch {
        res.status(500).json({ error: 'gagal fetch item' })
    }
}

// export const createGudang = async (req: Request, res: Response) => {
//     try {
//         const { nama, tipe, Stock, harga, spkId } = req.body

//         const gudang = await prisma.gudang.create({
//             data: { nama, tipe, Stock, harga, spkId },
//         })

//         res.status(201).json(gudang)
//     } catch {
//         res.status(500).json({ error: 'gagal create item' })
//     }
// }

// export const updateGudang = async (
//     req: Request<{ id: string }>,
//     res: Response,
// ): Promise<void> => {
//     try {
//         const { id } = req.params
//         const { nama, tipe, Stock, harga, spkId } = req.body

//         const existing = await prisma.gudang.findUnique({ where: { id } })
//         if (!existing) {
//             res.status(404).json({ error: 'Item Tidak Di Temukan' })
//             return
//         }

//         const updated = await prisma.gudang.update({
//             where: { id },
//             data: { nama, tipe, Stock, harga, spkId },
//         })

//         res.json(updated)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Item Gagal Di update' })
//     }
// }

// export const deleteGudang = async (
//     req: Request<{ id: string }>,
//     res: Response,
// ): Promise<void> => {
//     try {
//         const { id } = req.params

//         const existing = await prisma.gudang.findUnique({ where: { id } })
//         if (!existing) {
//             res.status(404).json({ error: 'Item Tidak Di Temukan' })
//             return
//         }

//         await prisma.gudang.delete({ where: { id } })
//         res.json({ message: 'Item Berhasil Di Hapus' })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Gagal Hapus Item' })
//     }
// }

export default {
    getGudangById,
    getAllGudang,
    // createGudang,
    // deleteGudang,
    // updateGudang,
}
