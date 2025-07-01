import { Request, Response } from 'express'
import { PrismaClient, UserRole } from '../../generated/prisma'
import bcrypt from 'bcryptjs'
import { errorResponse, successResponse } from '../utils/api.utils'

const prisma = new PrismaClient()

interface AuthRequest extends Request {
    session: Request['session'] & {
        user?: {
            id: string
            username: string
            role: UserRole
            firstName: string
            lastName?: string
            email: string
        }
    }
}

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, confirmPassword, firstName, lastName, email, phone, role } = req.body

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        })

        if (existingUser) {
            res.status(409).json(errorResponse('User with this username or email already exists'))
            return
        }

        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName: lastName || null,
                email,
                phone: phone || null,
                role: role || 'OPERATOR',
                isActive: true,
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        })

        res.status(201).json(successResponse(newUser, 'User registered successfully'))
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json(errorResponse('Internal server error during registration'))
    }
}

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body

        const user = await prisma.user.findUnique({
            where: { username },
        })

        if (!user) {
            res.status(401).json(errorResponse('Invalid credentials'))
            return
        }

        if (!user.isActive) {
            res.status(403).json(errorResponse('Account is deactivated. Please contact administrator.'))
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json(errorResponse('Invalid credentials'))
            return
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName || undefined,
            email: user.email,
        }

        res.status(200).json(successResponse({
                user: {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
            }, 'Login successful'))
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json(errorResponse('Internal server error during login'))
    }
}

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err)
                res.status(500).json(errorResponse('Error during logout'))
                return
            }

            res.clearCookie('sessionId')
            res.status(200).json(successResponse(null, 'Logout successful'))
        })
    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json(errorResponse('Internal server error during logout'))
    }
}

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.user!.id },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!user) {
            res.status(404).json(errorResponse('User not found'))
            return
        }

        res.status(200).json(successResponse(user))
    } catch (error) {
        console.error('Get profile error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.params.id || req.session.user!.id
        const { firstName, lastName, email, phone } = req.body

        if (email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    email,
                    NOT: { id: userId },
                },
            })

            if (existingUser) {
                res.status(409).json(errorResponse('Email is already taken by another user'))
                return
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                email: email || undefined,
                phone: phone || undefined,
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                updatedAt: true,
            },
        })

        if (userId === req.session.user!.id) {
            req.session.user = {
                ...req.session.user!,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName || undefined,
                email: updatedUser.email,
            }
        }

        res.status(200).json(successResponse(updatedUser, 'Profile updated successfully'))
    } catch (error) {
        console.error('Update profile error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { currentPassword, newPassword } = req.body
        const userId = req.session.user!.id

        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {
            res.status(404).json(errorResponse('User not found'))
            return
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
            res.status(401).json(errorResponse('Current password is incorrect'))
            return
        }

        const saltRounds = 12
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        })

        res.status(200).json(successResponse(null, 'Password changed successfully'))
    } catch (error) {
        console.error('Change password error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        })

        res.status(200).json(successResponse(users, 'Users retrieved successfully'))
    } catch (error) {
        console.error('Get all users error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export const updateUserByAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { firstName, lastName, email, phone, isActive, role } = req.body

        if (email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    email,
                    NOT: { id },
                },
            })

            if (existingUser) {
                res.status(409).json(errorResponse('Email is already taken by another user'))
                return
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                email: email || undefined,
                phone: phone || undefined,
                isActive: isActive !== undefined ? isActive : undefined,
                role: role || undefined,
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                updatedAt: true,
            },
        })

        res.status(200).json(successResponse(updatedUser, 'User updated successfully'))
    } catch (error) {
        console.error('Update user by admin error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!user) {
            res.status(404).json(errorResponse('User not found'))
            return
        }

        res.status(200).json(successResponse(user, 'User retrieved successfully'))
    } catch (error) {
        console.error('Get user by ID error:', error)
        res.status(500).json(errorResponse('Internal server error'))
    }
}

export default {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    updateUserByAdmin,
    getUserById,
}

