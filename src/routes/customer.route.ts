import express from 'express'
import { validate } from '../middlewares/validation.middleware'
import {
    customerPaginationValidation,
    customerIdValidation,
    createCustomerValidation,
    updateCustomerValidation,
} from '../validations/customer.validation'
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerStatistics,
} from '../controllers/customer.controller'

const router = express.Router()

router.get('/', validate(customerPaginationValidation), getAllCustomers)
router.get('/statistics', getCustomerStatistics)
router.get('/:id', validate(customerIdValidation), getCustomerById)

router.post('/', validate(createCustomerValidation), createCustomer)

router.put(
    '/:id',
    validate([...customerIdValidation, ...updateCustomerValidation]),
    updateCustomer,
)

router.delete('/:id', validate(customerIdValidation), deleteCustomer)

export default router

