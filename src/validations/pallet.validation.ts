import { body, param, query } from 'express-validator'
import { PalletStatus } from '../types/types'

export const palletIdValidation = [
    param('id').isString().withMessage('Pallet ID is required'),
]

export const createPalletValidation = [
    body('salesOrderId')
        .optional()
        .isString()
        .withMessage('Sales order ID must be a string'),
]

export const updatePalletValidation = [
    body('salesOrderId')
        .optional()
        .isString()
        .withMessage('Sales order ID must be a string'),
    body('status')
        .optional()
        .isIn(Object.values(PalletStatus))
        .withMessage('Invalid pallet status'),
]

export const addPalletItemValidation = [
    body('storageId').isString().withMessage('Storage ID is required'),
    body('spkId').isString().withMessage('SPK ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
]

export const updatePalletItemValidation = [
    param('itemId').isString().withMessage('Item ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
]

export const palletQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
    query('search').optional().isString(),
    query('status')
        .optional()
        .isIn(Object.values(PalletStatus))
        .withMessage('Invalid status'),
    query('salesOrderId')
        .optional()
        .isString()
        .withMessage('Sales order ID must be a string'),
]
