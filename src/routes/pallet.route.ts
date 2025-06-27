import express from 'express'
import palletController from '../controllers/pallet.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    palletIdValidation,
    createPalletValidation,
    updatePalletValidation,
    addPalletItemValidation,
    palletQueryValidation,
    createPalletsForSalesOrderValidation,
    fillPalletAutomaticallyValidation,
    checkStockAvailabilityValidation,
} from '../validations/pallet.validation'

const router = express.Router()

// Pallet routes
router.get('/', validate(palletQueryValidation), palletController.getAllPallets)
router.get('/:id', validate(palletIdValidation), palletController.getPalletById)
router.post(
    '/',
    validate(createPalletValidation),
    palletController.createPallet,
)
router.put(
    '/:id',
    validate([...palletIdValidation, ...updatePalletValidation]),
    palletController.updatePallet,
)
router.delete(
    '/:id',
    validate(palletIdValidation),
    palletController.deletePallet,
)
router.post(
    '/:id/ship',
    validate(palletIdValidation),
    palletController.markAsShipped,
)

// Pallet item route (manual add - kept for specific use cases)
router.post(
    '/:palletId/items',
    validate([...palletIdValidation, ...addPalletItemValidation]),
    palletController.addPalletItem,
)

// Improved pallet management routes
router.post(
    '/sales-order/create-pallets',
    validate(createPalletsForSalesOrderValidation),
    palletController.createPalletsForSalesOrder,
)
router.post(
    '/:palletId/fill-automatically',
    validate(fillPalletAutomaticallyValidation),
    palletController.fillPalletAutomatically,
)
router.post(
    '/sales-order/stock-availability',
    validate(checkStockAvailabilityValidation),
    palletController.checkStockAvailabilityForSalesOrder,
)

export default router
