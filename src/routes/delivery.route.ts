import { Router } from 'express'
import {
    getAllDeliveryOrders,
    getDeliveryOrderById,
    createDeliveryOrder,
    updateDeliveryOrderStatus,
    updateDeliveryOrder,
    deleteDeliveryOrder,
    startDelivery,
} from '../controllers/delivery.controller'
import { requireAuth } from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'
import {
    createDeliveryOrderSchema,
    updateDeliveryOrderSchema,
    updateDeliveryOrderStatusSchema,
    getDeliveryOrdersSchema,
} from '../validations/delivery.validation'

const router = Router()

router.use(requireAuth)

router.get('/', validate(getDeliveryOrdersSchema), getAllDeliveryOrders)

router.get('/:id', getDeliveryOrderById)

router.post('/', validate(createDeliveryOrderSchema), createDeliveryOrder)

router.put('/:id', validate(updateDeliveryOrderSchema), updateDeliveryOrder)

router.patch('/:id/status', validate(updateDeliveryOrderStatusSchema), updateDeliveryOrderStatus)

router.patch('/:id/start', startDelivery)

router.delete('/:id', deleteDeliveryOrder)

export default router

