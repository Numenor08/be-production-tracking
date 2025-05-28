import { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export const getAllsalesOrderBarang = async (_req: Request, res: Response) => {
    try {
        const data = await prisma.salesOrderBarang.findMany({
            include: {
                salesOrder: true,
                Barang: true,
            },
        })
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Gagal mengambil data relasi Sales Order dan Gudang',
        })
    }
}

export const getsalesOrderBarangById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await prisma.salesOrderBarang.findUnique({
            where: { id },
            include: {
                salesOrder: true,
                Barang: true,
            },
        })

        if (!data) {
            res.status(404).json({ error: 'Data relasi tidak ditemukan' })
        } else {
            res.json(data)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Gagal mengambil data relasi' })
    }
}

// export const createsalesOrderBarang = async (req: Request, res: Response) => {
//     try {
//         const { salesOrderId, gudangId, quantity } = req.body

//         const created = await prisma.salesOrderBarang.create({
//             data: {
//                 salesOrderId,
//                 gudangId,
//                 quantity,
//             },
//         })

//         res.status(201).json(created)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             error: 'Gagal membuat relasi Sales Order dan Gudang (kemungkinan kombinasi duplikat)',
//         })
//     }
// }

// export const updatesalesOrderBarang = async (
//     req: Request<{ id: string }>,
//     res: Response,
// ) => {
//     try {
//         const { id } = req.params
//         const { salesOrderId, gudangId, quantity } = req.body

//         const existing = await prisma.salesOrderBarang.findUnique({
//             where: { id },
//         })
//         if (!existing) {
//             res.status(404).json({ error: 'Data relasi tidak ditemukan' })
//             return
//         }

//         const updated = await prisma.salesOrderBarang.update({
//             where: { id },
//             data: {
//                 salesOrderId,
//                 gudangId,
//                 quantity,
//             },
//         })

//         res.json(updated)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             error: 'Gagal memperbarui data relasi Sales Order dan Gudang',
//         })
//     }
// }

// export const deletesalesOrderBarang = async (
//     req: Request<{ id: string }>,
//     res: Response,
// ) => {
//     try {
//         const { id } = req.params

//         const existing = await prisma.salesOrderBarang.findUnique({
//             where: { id },
//         })
//         if (!existing) {
//             res.status(404).json({ error: 'Data relasi tidak ditemukan' })
//             return
//         }

//         await prisma.salesOrderBarang.delete({ where: { id } })
//         res.json({ message: 'Data relasi berhasil dihapus' })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             error: 'Gagal menghapus data relasi Sales Order dan Gudang',
//         })
//     }
// }

export default {
    getAllsalesOrderBarang,
    getsalesOrderBarangById,
    // createsalesOrderBarang,
    // updatesalesOrderBarang,
    // deletesalesOrderBarang,
}
