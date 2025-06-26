import { body, param, query } from 'express-validator'

export const createCustomerValidation = [
    body('name')
        .isString()
        .withMessage('Customer name must be a string')
        .notEmpty()
        .withMessage('Customer name is required'),
    body('address')
        .optional()
        .isString()
        .withMessage('Address must be a string'),
    body('phone')
        .optional()
        .isString()
        .withMessage('Phone must be a string')
        .matches(/^(?:\+62|0)[2-9][0-9]{7,11}$/)
        .withMessage(
            'Phone must be a valid Indonesian number, starting with +62 or 0, and no dashes',
        ),
    body('email')
        .optional()
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    body('contactPerson')
        .optional()
        .isString()
        .withMessage('Contact person must be a string'),
]

export const updateCustomerValidation = [
    body('name')
        .optional()
        .isString()
        .withMessage('Customer name must be a string')
        .notEmpty()
        .withMessage('Customer name cannot be empty'),
    body('address')
        .optional()
        .isString()
        .withMessage('Address must be a string'),
    body('phone')
        .optional()
        .isString()
        .withMessage('Phone must be a string')
        .matches(/^(?:\+62|0)[2-9][0-9]{7,11}$/)
        .withMessage(
            'Phone must be a valid Indonesian number, starting with +62 or 0, and no dashes',
        ),
    body('email')
        .optional()
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    body('contactPerson')
        .optional()
        .isString()
        .withMessage('Contact person must be a string'),
]

export const customerPaginationValidation = [
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
    query('sortBy')
        .optional()
        .isString()
        .withMessage('Sort by must be a string'),
    query('sortOrder')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('Sort order must be either asc or desc'),
]

export const customerIdValidation = [
    param('id')
        .isString()
        .withMessage('Customer ID must be a string')
        .notEmpty()
        .withMessage('Customer ID is required'),
]
