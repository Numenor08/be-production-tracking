import express from 'express'
import dotenv from 'dotenv'
import salesOrderRoute from './routes/salesOrder.route'
import gudangRoutes from './routes/gudang.route'
import machineRouter from './routes/machine.route'
import spkRoutes from './routes/spk.route'
import barangRoutes from './routes/barang.route'
import laporanRoutes from './routes/Laporan.route'
import notFoundHandler from './middlewares/notFound.middleware'
import { printServerBanner, routeLogger, setPort} from './middlewares/routeLogger.middleware'
import cors from 'cors'
import colors from 'colors'

dotenv.config()
colors.enable();

const app = express()

const port = process.env.PORT || 3000;
setPort(port);

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
)

app.use(express.json())

app.use(routeLogger);

const apiV1Router = express.Router()

// apiV1Router.use('/sales-order', salesOrderRoute)
// apiV1Router.use('/storage', gudangRoutes)
apiV1Router.use('/machine', machineRouter)
// apiV1Router.use('/product', barangRoutes)
// apiV1Router.use('/production-order', spkRoutes)
// apiV1Router.use('/report', laporanRoutes)

app.use('/api/v1', apiV1Router)

app.get('/api', (req, res) => {
    res.json({
        message: 'Production Tracking API',
        version: 'v1',
        endpoints: '/api/v1'
    })
})

app.get('/', (req, res) => {
    res.send('Production Tracking API Server')
})

app.use(notFoundHandler)

app.listen(port, () => {
    printServerBanner()
})
