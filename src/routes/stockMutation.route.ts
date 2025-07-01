import { Router } from 'express'
import {
    getAllStockMutations,
    getStockMutationById,
    getStockMutationsByItem,
    getStockMutationsReport,
} from '../controllers/stockMutation.controller'
import { requireAuth } from '../middlewares/auth.middleware'

const router = Router()

router.use(requireAuth)

router.get('/', getAllStockMutations)

router.get('/report', getStockMutationsReport)

router.get('/item/:itemId', getStockMutationsByItem)

router.get('/:id', getStockMutationById)

export default router

