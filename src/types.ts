export interface SalesOrderInput {
    price: number
    customer_name: string
    finish_date: Date | string
    delivery_date: Date | string
}

export interface MaterialInput {
    material_name: string
    price: number
    stock: number
}

export interface ProductInput {
    product_name: string
    price: number
}

export interface ProductMaterialInput {
    productId: string
    materialId: string
    stock_needed: number
}
