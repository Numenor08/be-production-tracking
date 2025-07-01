import express from 'express'
import itemController from '../controllers/item.controller'
import { validate } from '../middlewares/validation.middleware'
import {
    createItemValidation,
    updateItemValidation,
    itemIdValidation,
    paginationValidation,
} from '../validations/item.validation'

const router = express.Router()

router.get('/', validate(paginationValidation), itemController.getAllItems)

router.get('/:id', validate(itemIdValidation), itemController.getItemById)

router.get(
    '/:id/stock',
    validate(itemIdValidation),
    itemController.getItemStock,
)

router.post('/', validate(createItemValidation), itemController.createItem)

router.put(
    '/:id',
    validate([...itemIdValidation, ...updateItemValidation]),
    itemController.updateItem,
)

router.delete('/:id', validate(itemIdValidation), itemController.deleteItem)

export default router

