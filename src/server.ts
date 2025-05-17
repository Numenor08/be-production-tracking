import express from 'express'
import dotenv from 'dotenv'
import salesOrderRoute from './routes/salesOrder.route'
import productRoute from './routes/product.route'
import productMaterialRoute from './routes/productMaterial.route'
import materialRoute from './routes/material.route'
import cors from 'cors'

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
)

app.use(express.json())

app.use('/sales-order', salesOrderRoute)
app.use('/product', productRoute)
app.use('/product-material', productMaterialRoute)
app.use('/material', materialRoute)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
