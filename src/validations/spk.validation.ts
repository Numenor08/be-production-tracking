import { startSPKPhase } from './../controllers/spk.controller';
import { body, param, query } from 'express-validator'
import {
    OrderStatus,
    ProcessStage,
    ItemType,
    PhaseStatus,
} from '../types/types'

const isValidEnum = (value: any, enumObj: any): boolean => {
    return Object.values(enumObj).includes(value)
}

export const spkIdValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
]

export const spkPaginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Items per page must be a positive integer'),
    query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string'),
    query('sortBy')
        .optional()
        .isString()
        .withMessage('Sort field must be a string'),
    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be either asc or desc'),
    query('status')
        .optional()
        .isIn(Object.values(OrderStatus))
        .withMessage('Status must be a valid order status'),
    query('stage')
        .optional()
        .isIn(Object.values(ProcessStage))
        .withMessage('Stage must be a valid process stage'),
]

export const createSPKValidation = [
    body('salesOrderId')
        .isString()
        .withMessage('Sales Order ID must be a string')
        .notEmpty()
        .withMessage('Sales Order ID is required'),
    body('salesOrderItemId')
        .isString()
        .withMessage('Sales Order Item ID must be a string')
        .notEmpty()
        .withMessage('Sales Order Item ID is required'),
    body('preprocessMachineId')
        .optional()
        .isString()
        .withMessage('Preprocess Machine ID must be a string'),
    body('processMachineId')
        .optional()
        .isString()
        .withMessage('Process Machine ID must be a string'),
    body('finishingMachineId')
        .optional()
        .isString()
        .withMessage('Finishing Machine ID must be a string'),
    body('preprocessDeadline')
        .optional()
        .isISO8601()
        .withMessage('Preprocess deadline must be a valid date'),
    body('processDeadline')
        .optional()
        .isISO8601()
        .withMessage('Process deadline must be a valid date'),
    body('finishingDeadline')
        .optional()
        .isISO8601()
        .withMessage('Finishing deadline must be a valid date'),
    body('targetQuantity')
        .isInt({ min: 1 })
        .withMessage('Target quantity must be a positive integer'),
]

export const updateSPKValidation = [
    body('preprocessMachineId')
        .optional()
        .isString()
        .withMessage('Preprocess Machine ID must be a string'),
    body('processMachineId')
        .optional()
        .isString()
        .withMessage('Process Machine ID must be a string'),
    body('finishingMachineId')
        .optional()
        .isString()
        .withMessage('Finishing Machine ID must be a string'),
    body('preprocessDeadline')
        .optional()
        .isISO8601()
        .withMessage('Preprocess deadline must be a valid date'),
    body('processDeadline')
        .optional()
        .isISO8601()
        .withMessage('Process deadline must be a valid date'),
    body('finishingDeadline')
        .optional()
        .isISO8601()
        .withMessage('Finishing deadline must be a valid date'),
    body('status')
        .optional()
        .isIn(Object.values(OrderStatus))
        .withMessage('Status must be a valid production status'),
]

export const completeSPKPhaseValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
    body('stage')
        .isIn(Object.values(ProcessStage))
        .withMessage('Stage must be one of: PREPROCESS, PROCESS, or FINISHING'),
    body('spkItemsResult')
        .isObject()
        .withMessage('SPK item results must be an object'),
    body('spkItemsResult.spkItemId')
        .isString()
        .withMessage('SPK item ID must be a string'),
    body('spkItemsResult.actualQuantity')
        .isInt({ min: 0 })
        .withMessage('Actual quantity must be a non-negative integer'),
    body('spkItemsResult.actualWaste')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Actual waste must be a non-negative integer'),
    body('spkItemsResult.storageUsed')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Storage used must be a non-negative integer'),
    body('spkItemsResult.storageId')
        .optional()
        .isString()
        .withMessage('Storage ID must be a string'),
    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string'),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid ISO8601 date string'),
]

export const startSPKPhaseValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
    body('stage')
        .isIn(Object.values(ProcessStage))
        .withMessage('Phase must be one of: PREPROCESS, PROCESS, or FINISHING'),
]

export const getSPKPhaseByStageValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
    query('stage')
        .isIn(Object.values(ProcessStage))
        .withMessage('Stage must be one of: PREPROCESS, PROCESS, or FINISHING'),
]

export const deleteSPKPhaseValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
    param('phaseId')
        .isString()
        .withMessage('Phase ID must be a string')
        .notEmpty()
        .withMessage('Phase ID is required'),
]

export const createSPKItemValidation = [
    param('id')
        .isString()
        .withMessage('SPK ID must be a string')
        .notEmpty()
        .withMessage('SPK ID is required'),
    body('outputItemId')
        .optional()
        .isString()
        .withMessage('Output Item ID must be a string'),
    body('phaseId')
        .optional()
        .isString()
        .withMessage('Phase ID must be a string'),
    body('stage')
        .optional()
        .isIn(Object.values(ProcessStage))
        .withMessage('Stage must be one of: PREPROCESS, PROCESS, or FINISHING'),
    body('type')
        .isIn(Object.values(ItemType))
        .withMessage('Type must be one of: MATERIAL, SEMI_FINISHED, or PRODUCT'),
    body('targetOutputQuantity')
        .isInt({ min: 1 })
        .withMessage('Target output quantity must be a positive integer'),
    body('targetWasteQuantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Target waste quantity must be a non-negative integer'),
    body('inputItems')
        .isArray()
        .withMessage('Input items must be an array'),
    body('inputItems.*.inputItemId')
        .isString()
        .withMessage('Input Item ID must be a string')
        .notEmpty()
        .withMessage('Input Item ID is required'),
    body('inputItems.*.inputQuantity')
        .isInt({ min: 1 })
        .withMessage('Input quantity must be a positive integer'),
]
