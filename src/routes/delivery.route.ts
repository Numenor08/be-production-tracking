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

// Apply authentication middleware to all routes
router.use(requireAuth)

// Get all delivery orders with pagination and filtering
router.get('/', validate(getDeliveryOrdersSchema), getAllDeliveryOrders)

// Get delivery order by ID
router.get('/:id', getDeliveryOrderById)

// Create new delivery order
router.post('/', validate(createDeliveryOrderSchema), createDeliveryOrder)

// Update delivery order details
router.put('/:id', validate(updateDeliveryOrderSchema), updateDeliveryOrder)

// Update delivery order status
router.patch('/:id/status', validate(updateDeliveryOrderStatusSchema), updateDeliveryOrderStatus)

// Start delivery (change status to IN_TRANSIT)
router.patch('/:id/start', startDelivery)

// Delete delivery order (only if not delivered)
router.delete('/:id', deleteDeliveryOrder)

export default router
