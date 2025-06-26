import express from 'express'
import palletController from '../controllers/pallet.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    palletIdValidation,
    createPalletValidation,
    updatePalletValidation,
    addPalletItemValidation,
    updatePalletItemValidation,
    palletQueryValidation,
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

// Pallet item routes
router.post(
    '/:palletId/items',
    validate([...palletIdValidation, ...addPalletItemValidation]),
    palletController.addPalletItem,
)
router.put(
    '/:palletId/items/:itemId',
    validate([...palletIdValidation, ...updatePalletItemValidation]),
    palletController.updatePalletItem,
)
router.delete(
    '/:palletId/items/:itemId',
    validate(palletIdValidation),
    palletController.removePalletItem,
)

export default router
