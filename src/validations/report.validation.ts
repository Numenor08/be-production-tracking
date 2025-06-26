import { body, param, query } from 'express-validator'
import { ProcessStage } from '../types/types'

export const reportIdValidation = [
    param('id').isString().withMessage('Report ID is required'),
]

export const reportItemIdValidation = [
    param('itemId').isString().withMessage('Report item ID is required'),
]

export const createReportValidation = [
    body('spkId').isString().withMessage('SPK ID is required'),
    body('code').isString().withMessage('Report code is required'),
]

export const updateReportValidation = [
    body('preprocessDetails')
        .optional()
        .isString()
        .withMessage('Preprocess details must be a string'),
    body('processDetails')
        .optional()
        .isString()
        .withMessage('Process details must be a string'),
    body('finishingDetails')
        .optional()
        .isString()
        .withMessage('Finishing details must be a string'),
    body('preprocessCompletionDate')
        .optional()
        .isISO8601()
        .withMessage('Preprocess completion date must be a valid date'),
    body('processCompletionDate')
        .optional()
        .isISO8601()
        .withMessage('Process completion date must be a valid date'),
    body('finishingCompletionDate')
        .optional()
        .isISO8601()
        .withMessage('Finishing completion date must be a valid date'),
]

export const updateReportItemValidation = [
    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
    body('wasteQuantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Waste quantity must be a non-negative integer'),
    body('storageUsed')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Storage used must be a non-negative integer'),
    body('notes').optional().isString().withMessage('Notes must be a string'),
    body('phase')
        .optional()
        .isIn(Object.values(ProcessStage))
        .withMessage('Phase must be a valid process stage'),
    body('itemId')
        .optional()
        .isString()
        .withMessage('Item ID must be a string'),
    body('storageId')
        .optional()
        .isString()
        .withMessage('Storage ID must be a string'),
]

export const reportPaginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
    query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string'),
    query('spkId').optional().isString().withMessage('SPK ID must be a string'),
    query('sortBy')
        .optional()
        .isString()
        .withMessage('Sort by must be a string'),
    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be either asc or desc'),
]
