import express from 'express'
import storageController from '../controllers/storage.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    storageIdValidation,
    createStorageValidation,
    updateStorageValidation,
    storageQueryValidation,
    addStockValidation,
    reduceStockValidation,
} from '../validations/storage.validation'

const router = express.Router()

router.get(
    '/',
    validate(storageQueryValidation),
    storageController.getAllStorage,
)
router.get(
    '/:id',
    validate(storageIdValidation),
    storageController.getStorageById,
)
router.post(
    '/',
    validate(createStorageValidation),
    storageController.createStorage,
)
router.put(
    '/:id',
    validate([...storageIdValidation, ...updateStorageValidation]),
    storageController.updateStorage,
)
router.delete(
    '/:id',
    validate(storageIdValidation),
    storageController.deleteStorage,
)

router.post(
    '/add-stock',
    validate(addStockValidation),
    storageController.addStockByItem
)

router.put(
    '/reduce-stock',
    validate(reduceStockValidation),
    storageController.reduceStockByItem
)

// Routes for stock transactions
router.post('/transfer', storageController.transferStock)
router.get('/by-item/:itemId', storageController.getStorageByItem)
router.get('/by-spk/:spkId', storageController.getStorageBySPK)

export default router
