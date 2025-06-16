import express from 'express'
import storageController from '../controllers/storage.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    storageIdValidation,
    createStorageValidation,
    updateStorageValidation,
    storageQueryValidation,
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

// Routes for stock transactions
router.post('/transfer', storageController.transferStock)
router.post('/mark-as-waste', storageController.markAsWaste)
router.get('/by-item/:itemId', storageController.getStorageByItem)
router.get('/by-spk/:spkId', storageController.getStorageBySPK)

export default router
