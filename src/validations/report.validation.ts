import { body, param, query } from 'express-validator'
import { ProcessStage } from '../types/types'

export const reportIdValidation = [
  param('id').isString().withMessage('Report ID is required')
]

export const reportItemIdValidation = [
  param('itemId').isString().withMessage('Report item ID is required')
]

export const createReportValidation = [
  body('spkId').isString().withMessage('SPK ID is required')
]

export const updateReportValidation = [
  body('preprocessDetails').optional().isString(),
  body('processDetails').optional().isString(),
  body('finishingDetails').optional().isString(),
  body('preprocessCompletionDate').optional().isISO8601(),
  body('processCompletionDate').optional().isISO8601(),
  body('finishingCompletionDate').optional().isISO8601(),
  body('preprocessSummary').optional(),
  body('processSummary').optional(),
  body('finishingSummary').optional()
]

export const createReportItemValidation = [
  body('itemId').isString().withMessage('Item ID is required'),
  body('phase').isIn(Object.values(ProcessStage)).withMessage('Valid phase is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('wasteQuantity').optional().isInt({ min: 0 }).withMessage('Waste quantity must be a positive integer'),
  body('storageUsed').optional().isInt({ min: 0 }).withMessage('Storage used must be a positive integer'),
  body('notes').optional().isString()
]

export const updateReportItemValidation = [
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('wasteQuantity').optional().isInt({ min: 0 }).withMessage('Waste quantity must be a positive integer'),
  body('storageUsed').optional().isInt({ min: 0 }).withMessage('Storage used must be a positive integer'),
  body('notes').optional().isString()
]