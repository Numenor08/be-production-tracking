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

router.post(
    '/:palletId/items',
    validate([...palletIdValidation, ...addPalletItemValidation]),
    palletController.addPalletItem,
)

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

