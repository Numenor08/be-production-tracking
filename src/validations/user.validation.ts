import { body } from 'express-validator'

export const loginValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
]

export const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    
    body('password')
        .isLength({ min: 8, max: 15 })
        .withMessage('Password must be between 8 and 15 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
    
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password')
            }
            return true
        }),
    
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('lastName')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Last name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('phone')
        .optional()
        .matches(/^[\+]?[0-9\-\(\)\s]+$/)
        .withMessage('Please provide a valid phone number'),
    
    body('role')
        .optional()
        .isIn(['ADMIN', 'OPERATOR'])
        .withMessage('Role must be either ADMIN or OPERATOR')
]

export const updateUserValidation = [
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('lastName')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Last name must not exceed 50 characters')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('phone')
        .optional()
        .matches(/^[\+]?[0-9\-\(\)\s]+$/)
        .withMessage('Please provide a valid phone number'),
    
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean value'),
    
    body('role')
        .optional()
        .isIn(['ADMIN', 'OPERATOR'])
        .withMessage('Role must be either ADMIN or OPERATOR')
]

export const changePasswordValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    
    body('newPassword')
        .isLength({ min: 8, max: 15 })
        .withMessage('New password must be between 8 and 15 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
    
    body('confirmNewPassword')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Password confirmation does not match new password')
            }
            return true
        })
]

