import { body, param, query } from 'express-validator'

export const getAllProductionReportValidation = [
    query('page').isInt({ min: 1 }).optional(),
    query('limit').isInt({ min: 1, max: 100 }).optional(),
    query('search').isString().optional(),
    query('sortBy').isString().optional(),
    query('sortOrder').isIn(['asc', 'desc']).optional(),
]

export const getProductionReportByIdValidation = [
    param('id').isString().withMessage('Report ID must be a string'),
]

