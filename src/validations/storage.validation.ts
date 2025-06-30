import { body, param, query } from 'express-validator'
import { ProcessStage } from '../types/types'

export const storageIdValidation = [
    param('id').isString().withMessage('Storage ID is required'),
]

export const createStorageValidation = [
    body('spkId').isString().withMessage('SPK ID is required'),
    body('itemId').isString().withMessage('Item ID is required'),
    body('spkStage')
        .isIn(Object.values(ProcessStage))
        .withMessage('Valid production stage is required'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
    body('isWaste')
        .optional()
        .isBoolean()
        .withMessage('isWaste must be a boolean'),
]

export const updateStorageValidation = [
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
]

export const transferStockValidation = [
    body('sourceId').isString().withMessage('Source storage ID is required'),
    body('targetId').isString().withMessage('Target storage ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Transfer quantity must be a positive integer'),
]

export const storageQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
    query('search').optional().isString(),
    query('isWaste')
        .optional()
        .isBoolean()
        .withMessage('isWaste must be a boolean'),
    query('itemType').optional().isString(),
    query('stage')
        .optional()
        .isIn(Object.values(ProcessStage))
        .withMessage('Stage must be a valid process stage'),
    query('spkId').optional().isString().withMessage('SPK ID must be a string'),
]

export const itemIdStorageValidation = [
    param('itemId').isString().withMessage('Item ID is required'),
]

export const spkIdStorageValidation = [
    param('spkId').isString().withMessage('SPK ID is required'),
]

export const reduceStockValidation = [
    body('itemId')
        .isString()
        .withMessage('Item ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
]

export const addStockValidation = [
    body('itemId')
        .isString()
        .withMessage('Item ID is required'),
    body('spkId')
        .optional()
        .isString()
        .withMessage('SPK ID is required'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
    body('stage')
        .optional()
        .isIn(Object.values(ProcessStage))
        .withMessage('Valid production stage is required'),
]