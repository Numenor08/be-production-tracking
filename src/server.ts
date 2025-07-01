import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '../generated/prisma'
import salesOrderRoute from './routes/salesOrder.route'
import storageRoute from './routes/storage.route'
import machineRouter from './routes/machine.route'
import spkRoutes from './routes/spk.route'
import itemRoutes from './routes/item.route'
import reportRoute from './routes/report.route'
import palletRoute from './routes/pallet.route'
import deliveryRoute from './routes/delivery.route'
import customerRoute from './routes/customer.route'
import userRoute from './routes/user.route'
import stockMutationRoute from './routes/stockMutation.route'
import notFoundHandler from './middlewares/notFound.middleware'
import {
    printServerBanner,
    routeLogger,
    setPort,
} from './middlewares/routelogger.middleware'
import { startSessionCleanup } from './utils/sessionCleanup'
import { requireAuth } from './middlewares/auth.middleware'
import cors from 'cors'
import colors from 'colors'

dotenv.config()
colors.enable()

const app = express()
const prisma = new PrismaClient()

const port = process.env.PORT || 3000
setPort(port)

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    }),
)

app.use(
    session({
        store: new PrismaSessionStore(
            prisma,
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        ),
        secret: process.env.SESSION_SECRET || 'your-secret-key-here-change-in-production',
        resave: false,
        saveUninitialized: false,
        name: 'sessionId',
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        },
    }),
)

app.use(express.json())

app.use(routeLogger)

const apiV1Router = express.Router()

apiV1Router.use('/auth', userRoute)
apiV1Router.use('/customer', requireAuth, customerRoute)
apiV1Router.use('/sales-order', requireAuth, salesOrderRoute)
apiV1Router.use('/storage', requireAuth, storageRoute)
apiV1Router.use('/machine', requireAuth, machineRouter)
apiV1Router.use('/item', requireAuth, itemRoutes)
apiV1Router.use('/spk', requireAuth, spkRoutes)
apiV1Router.use('/report', requireAuth, reportRoute)
apiV1Router.use('/pallet', requireAuth, palletRoute)
apiV1Router.use('/delivery', requireAuth, deliveryRoute)
apiV1Router.use('/stock-mutation', requireAuth, stockMutationRoute)

app.use('/api/v1', apiV1Router)

app.get('/api', (req, res) => {
    res.json({
        message: 'Production Tracking API',
        version: 'v1',
        endpoints: '/api/v1',
    })
})

app.get('/', (req, res) => {
    res.send('Production Tracking API Server')
})

app.use(notFoundHandler)

app.listen(port, () => {
    printServerBanner()
    
    startSessionCleanup()
})

