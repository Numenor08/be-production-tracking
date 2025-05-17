import { PrismaClient } from '../generated/prisma'
import { Request, Response } from 'express'
import { MaterialInput } from '../types'

const prisma = new PrismaClient()

export const getMaterials = async (req: Request, res: Response) => {
    try {
        const materials = await prisma.material.findMany()
        res.json(materials)
    } catch {
        res.status(500).json({ error: 'Failed to fetch materials' })
    }
}

export const getMaterialById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const material = await prisma.material.findUnique({ where: { id } })

        if (!material) res.status(404).json({ error: 'Material not found' })
        return
    } catch {
        res.status(500).json({ error: 'Failed to fetch material' })
    }
}

export const createMaterial = async (req: Request, res: Response) => {
    const data = req.body as MaterialInput

    try {
        const created = await prisma.material.create({
            data: {
                material_name: data.material_name,
                price: data.price,
                stock: data.stock,
            },
        })
        res.status(201).json(created)
    } catch {
        res.status(500).json({ error: 'Failed to create material' })
    }
}

export const updateMaterial = async (req: Request, res: Response) => {
    const data = req.body as Partial<MaterialInput>

    try {
        const id = req.params.id
        const updated = await prisma.material.update({
            where: { id },
            data,
        })
        res.json(updated)
    } catch {
        res.status(500).json({ error: 'Failed to update material' })
    }
}

export const deleteMaterial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await prisma.material.delete({ where: { id } })
        res.status(204).send()
    } catch {
        res.status(500).json({ error: 'Failed to delete material' })
    }
}

export default {
    getMaterials,
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
}
