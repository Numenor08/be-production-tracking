import { PrismaClient } from '../generated/prisma'
import { Request, Response } from 'express'
import { ProductMaterialInput } from '../types'

const prisma = new PrismaClient()

export const getProductMaterials = async (req: Request, res: Response) => {
    try {
        const data = await prisma.productMaterial.findMany({
            include: {
                product: true,
                material: true,
            },
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch product-material relations',
        })
    }
}

export const getProductMaterialById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await prisma.productMaterial.findUnique({
            where: { id },
            include: {
                product: true,
                material: true,
            },
        })

        if (!data) {
            res.status(404).json({
                error: 'ProductMaterial relation not found',
            })
            return
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch product-material relation',
        })
    }
}

export const createProductMaterial = async (req: Request, res: Response) => {
    const data = req.body as ProductMaterialInput

    try {
        const created = await prisma.productMaterial.create({
            data: {
                productId: data.productId,
                materialId: data.materialId,
                stock_needed: data.stock_needed,
            },
            include: {
                product: true,
                material: true,
            },
        })
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to create product-material relation',
        })
    }
}

export const updateProductMaterial = async (req: Request, res: Response) => {
    const data = req.body as Partial<ProductMaterialInput>

    try {
        const id = req.params.id
        const updated = await prisma.productMaterial.update({
            where: { id },
            data: {
                productId: data.productId,
                materialId: data.materialId,
                stock_needed: data.stock_needed,
            },
            include: {
                product: true,
                material: true,
            },
        })
        res.json(updated)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to update product-material relation',
        })
    }
}

export const deleteProductMaterial = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await prisma.productMaterial.delete({ where: { id } })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete product-material relation',
        })
    }
}

export default {
    getProductMaterials,
    getProductMaterialById,
    createProductMaterial,
    updateProductMaterial,
    deleteProductMaterial,
}
