import express from 'express'
import salesOrderController from '../controllers/salesOrder.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    createSalesOrderValidation,
    updateSalesOrderValidation,
    updateSalesOrderItemsValidation,
    salesOrderIdValidation,
    salesOrderPaginationValidation,
} from '../validations/salesOrder.validation'

const router = express.Router()

router.get(
    '/',
    validate(salesOrderPaginationValidation),
    salesOrderController.getAllSalesOrders,
)

router.get(
    '/:id',
    validate(salesOrderIdValidation),
    salesOrderController.getSalesOrderById,
)

router.get(
    '/:id/progress',
    validate(salesOrderIdValidation),
    salesOrderController.getSalesOrderProgress,
)

router.post(
    '/',
    validate(createSalesOrderValidation),
    salesOrderController.createSalesOrder,
)

router.put(
    '/:id',
    validate([...salesOrderIdValidation, ...updateSalesOrderValidation]),
    salesOrderController.updateSalesOrder,
)

router.put(
    '/:id/items',
    validate([...salesOrderIdValidation, ...updateSalesOrderItemsValidation]),
    salesOrderController.updateSalesOrderItems,
)

router.delete(
    '/:id',
    validate(salesOrderIdValidation),
    salesOrderController.deleteSalesOrder,
)

export default router
