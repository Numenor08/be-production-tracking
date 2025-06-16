import { body, param, query } from 'express-validator'
import { OrderStatus, ProcessStage } from '../types/types'
import { ItemType } from '../types/types'

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
    body('productionItemsData')
        .isArray()
        .withMessage('Production items data must be an array'),
    body('productionItemsData.*.inputItemId')
        .isString()
        .withMessage('Input Item ID must be a string')
        .notEmpty()
        .withMessage('Input Item ID is required'),
    body('productionItemsData.*.inputQuantity')
        .isInt({ min: 1 })
        .withMessage('Input quantity must be a positive integer'),
    body('productionItemsData.*.type')
        .custom((value) => isValidEnum(value, ItemType))
        .withMessage('Type must be a valid item type (MATERIAL, SEMI_FINISHED, or PRODUCT)'),
    body('productionItemsData.*.outputQuantity')
        .isInt({ min: 1 })
        .withMessage('Output quantity must be a positive integer'),
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