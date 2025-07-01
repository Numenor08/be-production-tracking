import { body, param, query } from 'express-validator'
import { ItemType } from '../types/types'

const isValidItemType = (value: any): boolean => {
    return Object.values(ItemType).includes(value)
}

export const createItemValidation = [
    body('name').notEmpty().withMessage('Item name is required').trim(),
    body('type')
        .notEmpty()
        .withMessage('Item type is required')
        .custom(isValidItemType)
        .withMessage('Item type must be MATERIAL, SEMI_FINISHED, or PRODUCT'),
    body('price')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Price must be a non-negative number')
        .custom((value, { req }) => {
            const type = req.body.type
            if (
                (type === ItemType.MATERIAL || type === ItemType.PRODUCT) &&
                value === undefined
            ) {
                throw new Error(
                    'Price is required for MATERIAL and PRODUCT items',
                )
            }
            return true
        }),
]

export const updateItemValidation = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Item name cannot be empty')
        .trim(),
    body('type')
        .optional()
        .custom(isValidItemType)
        .withMessage('Item type must be MATERIAL, SEMI_FINISHED, or PRODUCT'),
    body('price')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Price must be a non-negative number'),
]

export const paginationValidation = [
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
    query('type')
        .optional()
        .custom(isValidItemType)
        .withMessage('Type must be a valid item type'),
]

export const itemIdValidation = [
    param('id').notEmpty().withMessage('Item ID is required'),
]

