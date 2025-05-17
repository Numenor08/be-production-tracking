import { PrismaClient } from '../../generated/prisma'
import { Request, Response } from 'express'
import { ProductInput } from '../types'

const prisma = new PrismaClient()

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch {
        res.status(500).json({ error: 'Failed to fetch products' })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await prisma.product.findUnique({ where: { id } })

        if (!product) res.status(404).json({ error: 'Product not found' })
        return
    } catch {
        res.status(500).json({ error: 'Failed to fetch product' })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    const data = req.body as ProductInput

    try {
        const created = await prisma.product.create({
            data: {
                product_name: data.product_name,
                price: data.price,
            },
        })
        res.status(201).json(created)
    } catch {
        res.status(500).json({ error: 'Failed to create product' })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const data = req.body as Partial<ProductInput>

    try {
        const id = req.params.id
        const updated = await prisma.product.update({
            where: { id },
            data,
        })
        res.json(updated)
    } catch {
        res.status(500).json({ error: 'Failed to update product' })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        await prisma.product.delete({ where: { id } })
        res.status(204).send()
    } catch {
        res.status(500).json({ error: 'Failed to delete product' })
    }
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
