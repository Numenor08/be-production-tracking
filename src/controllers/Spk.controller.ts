import { Request, Response } from 'express'
import { PrismaClient, StatusPesanan } from '../../generated/prisma'

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

// export const createSPK = async (req: Request, res: Response) => {
//     const {
//         mesin_preprocess,
//         mesin_process,
//         mesin_finishing,
//         salesOrderId,
//         tanggal_deadline_preprocess,
//         tanggal_deadline_process,
//         tanggal_deadline_finishing,
//         spkBarangData = [],
//     } = req.body

//     try {
//         const result = await prisma.$transaction(async (tx) => {
//             const newSPK = await tx.sPK.create({
//                 data: {
//                     tanggal_deadline_preprocess: new Date(
//                         tanggal_deadline_preprocess,
//                     ),
//                     tanggal_deadline_process: new Date(tanggal_deadline_process),
//                     tanggal_deadline_finishing: new Date(
//                         tanggal_deadline_finishing,
//                     ),
//                     status:StatusPesanan.IDLE,
//                     salesOrderId,
//                     mesin_preprocess,
//                     mesin_process,
//                     mesin_finishing,
//                 },
//             })

//             if (spkBarangData.length > 0) {
//                 console.log('spkBarangData:', spkBarangData)
//                 await tx.spkBarang.createMany({
//                     data: spkBarangData.map(
//                         (item: {
//                             barangId: string
//                             quantity: number
//                             tipe: number
//                         }) => ({
//                             spkId: newSPK.id,
//                             barangId: item.barangId,
//                             quantity: item.quantity,
//                             tipe: item.tipe,
//                         }),
//                     ),
//                 })
//             }

//             return newSPK
//         })

//         res.status(201).json(result)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({
//             error: 'Gagal membuat SPK dan menghubungkan entitas',
//         })
//     }
// }

export const createSPK = async (req: Request, res: Response) => {
    const {
        mesin_preprocess,
        mesin_process,
        mesin_finishing,
        salesOrderId,
        tanggal_deadline_preprocess,
        tanggal_deadline_process,
        tanggal_deadline_finishing,
        spkBarangData = [],
    } = req.body

    try {
        const result = await prisma.$transaction(async (tx) => {
            const dataToCreate: any = {
                tanggal_deadline_preprocess: tanggal_deadline_preprocess
                    ? new Date(tanggal_deadline_preprocess)
                    : null,
                tanggal_deadline_process: tanggal_deadline_process
                    ? new Date(tanggal_deadline_process)
                    : null,
                tanggal_deadline_finishing: tanggal_deadline_finishing
                    ? new Date(tanggal_deadline_finishing)
                    : null,
                status: StatusPesanan.DIPROSES,
                salesOrder: { connect: { id: salesOrderId } },
            }

            // Connect mesin_preprocess kalau ada
            if (mesin_preprocess) {
                dataToCreate.mesin1 = { connect: { id: mesin_preprocess } }
            }

            // Connect mesin_process kalau ada
            if (mesin_process) {
                dataToCreate.mesin2 = { connect: { id: mesin_process } }
            }

            // Connect mesin_finishing kalau ada
            if (mesin_finishing) {
                dataToCreate.mesin3 = { connect: { id: mesin_finishing } }
            }

            const newSPK = await tx.sPK.create({
                data: dataToCreate,
            })

            if (spkBarangData.length > 0) {
                await tx.spkBarang.createMany({
                    data: spkBarangData.map(
                        (item: {
                            barang_input_Id: string
                            quantity_input: number
                            tipe: number
                            barang_output_Id: string
                            quantity_output: number
                        }) => ({
                            spkId: newSPK.id,
                            barang_input_Id: item.barang_input_Id,
                            quantity_input: item.quantity_input,
                            tipe: item.tipe,
                            barang_output_Id: item.barang_output_Id,
                            quantity_output: item.quantity_output,
                        }),
                    ),
                })
            }

            // const salesOrderBarang = await tx.salesOrderBarang.findMany({
            //     where: {
            //         salesOrderId,
            //         NOT: {
            //             barangId: null,
            //         },
            //     },
            //     select: {
            //         barangId: true,
            //         quantity: true,
            //     },
            // })

            // const spkBarangs = await tx.spkBarang.findMany({
            //     where: {
            //         spk: {
            //             salesOrderId: salesOrderId,
            //         },
            //     },
            //     select: {
            //         barangId: true,
            //         quantity: true,
            //     },
            // })

            // const barangTerpakaiMap: Record<string, number> = {}
            // for (const sb of spkBarangs) {
            //     if (sb.barangId !== null) {
            //         barangTerpakaiMap[sb.barangId] =
            //             (barangTerpakaiMap[sb.barangId] || 0) + sb.quantity
            //     }
            // }

            // let adaSisa = false
            // for (const soBarang of salesOrderBarang) {
            //     if (soBarang.barangId !== null) {
            //         const terpakai = barangTerpakaiMap[soBarang.barangId] || 0
            //         if (terpakai < soBarang.quantity) {
            //             adaSisa = true
            //             break
            //         }
            //     }
            // }

            // await tx.sales_Order.update({
            //     where: { id: salesOrderId },
            //     data: {
            //         status: adaSisa
            //             ? StatusPesanan.DIPROSES_DAN_DIPECAH
            //             : StatusPesanan.DIPROSES,
            //     },
            // })

            await tx.sales_Order.update({
                where: { id: salesOrderId },
                data: {
                    status: StatusPesanan.DIPROSES,
                },
            })

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
            data: {},
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
