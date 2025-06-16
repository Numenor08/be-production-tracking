import { body, param, query } from 'express-validator'
import { ProcessStage } from '../types/types'

export const storageIdValidation = [
  param('id').isString().withMessage('Storage ID is required')
]

export const createStorageValidation = [
  body('spkId').isString().withMessage('SPK ID is required'),
  body('itemId').isString().withMessage('Item ID is required'),
  body('productionStage')
    .isIn(Object.values(ProcessStage))
    .withMessage('Valid production stage is required'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  body('wasteStock').optional().isInt({ min: 0 }).withMessage('Waste stock must be a positive integer'),
  body('isWaste').optional().isBoolean().withMessage('isWaste must be a boolean')
]

export const updateStorageValidation = [
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  body('wasteStock').optional().isInt({ min: 0 }).withMessage('Waste stock must be a positive integer')
]

export const storageQueryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('search').optional().isString(),
  query('isWaste').optional().isBoolean(),
  query('itemType').optional().isString(),
  query('stage').optional().isIn(Object.values(ProcessStage))
]