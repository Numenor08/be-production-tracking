import { body, query } from 'express-validator'

export const createDeliveryOrderSchema = [
    body('salesOrderId')
        .notEmpty()
        .withMessage('Sales order ID is required')
        .isString()
        .withMessage('Sales order ID must be a string'),
    body('deliveryDate')
        .notEmpty()
        .withMessage('Delivery date is required')
        .isISO8601()
        .withMessage('Delivery date must be a valid date'),
    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string')
        .isLength({ max: 500 })
        .withMessage('Notes must not exceed 500 characters'),
]

export const updateDeliveryOrderSchema = [
    body('deliveryDate')
        .optional()
        .isISO8601()
        .withMessage('Delivery date must be a valid date'),
    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string')
        .isLength({ max: 500 })
        .withMessage('Notes must not exceed 500 characters'),
]

export const updateDeliveryOrderStatusSchema = [
    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['PENDING', 'IN_TRANSIT', 'DELIVERED'])
        .withMessage('Status must be PENDING, IN_TRANSIT, or DELIVERED'),
    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string')
        .isLength({ max: 500 })
        .withMessage('Notes must not exceed 500 characters'),
]

export const getDeliveryOrdersSchema = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string')
        .isLength({ min: 1 })
        .withMessage('Search must not be empty'),
    query('status')
        .optional()
        .isIn(['PENDING', 'IN_TRANSIT', 'DELIVERED'])
        .withMessage('Status must be PENDING, IN_TRANSIT, or DELIVERED'),
]
