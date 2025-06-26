import express from 'express'
import userController from '../controllers/user.controller'
import {
    loginValidation,
    registerValidation,
    updateUserValidation,
    changePasswordValidation,
} from '../validations/user.validation'
import {
    requireAuth,
    requireAdmin,
    requireOwnershipOrAdmin,
    requireGuest,
} from '../middlewares/auth.middleware'
import { validate } from '../middlewares/validation.middleware'


const router = express.Router()

// Public routes (no authentication required)
router.post('/register', requireGuest, validate(registerValidation), userController.register)
router.post('/login', requireGuest, validate(loginValidation), userController.login)

// Protected routes (authentication required)
router.post('/logout', requireAuth, userController.logout)
router.get('/profile', requireAuth, userController.getProfile)
router.put('/profile', requireAuth, validate(updateUserValidation), userController.updateProfile)
router.put('/profile/:id', requireAuth, requireOwnershipOrAdmin('id'), validate(updateUserValidation), userController.updateProfile)
router.put('/change-password', requireAuth, validate(changePasswordValidation), userController.changePassword)

// Admin only routes
router.get('/users', requireAuth, requireAdmin, userController.getAllUsers)
router.get('/users/:id', requireAuth, requireAdmin, userController.getUserById)
router.put('/users/:id', requireAuth, requireAdmin, validate(updateUserValidation), userController.updateUserByAdmin)

export default router