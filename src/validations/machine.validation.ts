import { body, param, query } from 'express-validator'
import { ProcessStage } from '../types/types'

const isValidProcessStage = (value: any): boolean => {
    return Object.values(ProcessStage).includes(value)
}

export const createMachineValidation = [
    body('name').notEmpty().withMessage('Machine name is required').trim(),
    body('details')
        .notEmpty()
        .withMessage('Machine details are required')
        .isString()
        .withMessage('Machine details must be a string')
        .isLength({ max: 255 })
        .withMessage('Machine details must not exceed 255 characters')
        .trim(),
    body('type')
        .notEmpty()
        .withMessage('Machine type is required')
        .custom(isValidProcessStage)
        .withMessage('Machine type must be a valid process stage'),
]

export const updateMachineValidation = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Machine name cannot be empty')
        .trim(),
    body('details')
        .optional()
        .notEmpty()
        .withMessage('Machine details cannot be empty')
        .isString()
        .withMessage('Machine details must be a string')
        .isLength({ max: 255 })
        .withMessage('Machine details must not exceed 255 characters')
        .trim(),
    body('type')
        .optional()
        .custom(isValidProcessStage)
        .withMessage('Machine type must be a valid process stage'),
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
        .custom(isValidProcessStage)
        .withMessage('Type must be a valid process stage'),
]

export const machineIdValidation = [
    param('id').notEmpty().withMessage('Machine ID is required'),
]
