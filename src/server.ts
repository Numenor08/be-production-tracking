import express from 'express'
import dotenv from 'dotenv'
import salesOrderRoute from './routes/salesOrder.route'
import gudangRoutes from './routes/gudang.route'
import mesinRoutes from './routes/mesin.route'
import spkRoutes from './routes/spk.route'
import barangRoutes from './routes/barang.route'
import laporanRoutes from './routes/Laporan.route'
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
app.use('/gudang', gudangRoutes)
app.use('/mesin', mesinRoutes)
app.use('/barang', barangRoutes)
app.use('/spk', spkRoutes)
app.use('/laporan', laporanRoutes)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
