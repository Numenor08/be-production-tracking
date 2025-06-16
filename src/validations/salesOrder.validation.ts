import { body, param, query } from 'express-validator'
import { OrderStatus } from '../types/types'

// Helper function to validate enum values
const isValidOrderStatus = (value: any): boolean => {
    return Object.values(OrderStatus).includes(value)
}

export const createSalesOrderValidation = [
    body('customerName')
        .notEmpty()
        .withMessage('Customer name is required')
        .trim(),
    body('completionDate')
        .notEmpty()
        .withMessage('Completion date is required')
        .isISO8601()
        .withMessage('Completion date must be a valid date'),
    body('deliveryDate')
        .notEmpty()
        .withMessage('Delivery date is required')
        .isISO8601()
        .withMessage('Delivery date must be a valid date'),
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.itemId').notEmpty().withMessage('Item ID is required'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
]

export const updateSalesOrderValidation = [
    body('customerName')
        .optional()
        .notEmpty()
        .withMessage('Customer name cannot be empty')
        .trim(),
    body('completionDate')
        .optional()
        .isISO8601()
        .withMessage('Completion date must be a valid date'),
    body('deliveryDate')
        .optional()
        .isISO8601()
        .withMessage('Delivery date must be a valid date'),
    body('status')
        .optional()
        .custom(isValidOrderStatus)
        .withMessage('Status must be a valid order status'),
]

export const updateSalesOrderItemsValidation = [
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.itemId').notEmpty().withMessage('Item ID is required'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
]

export const salesOrderPaginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer')
        .toInt(),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer')
        .toInt(),
    query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string'),
    query('sortBy')
        .optional()
        .isString()
        .withMessage('SortBy must be a string'),
    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('SortOrder must be either asc or desc'),
    query('status')
        .optional()
        .custom(isValidOrderStatus)
        .withMessage('Status must be a valid order status'),
]

export const salesOrderIdValidation = [
    param('id').notEmpty().withMessage('Sales order ID is required'),
]
