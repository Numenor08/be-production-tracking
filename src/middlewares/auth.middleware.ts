import e, { Request, Response, NextFunction } from 'express'
import { PrismaClient, UserRole } from '../../generated/prisma'
import { errorResponse } from '../utils/api.utils'

// Extend Request interface to include user and session
declare module 'express-session' {
    interface SessionData {
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

const prisma = new PrismaClient()

// Middleware to check if user is authenticated
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.session.user) {
            res.status(401).json(errorResponse('Authentication required. Please login.'))
            return
        }

        // Verify user still exists and is active
        const user = await prisma.user.findUnique({
            where: { id: req.session.user.id },
        })

        if (!user || !user.isActive) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Session destruction error:', err)
                }
            })
            res.status(401).json(errorResponse('User is inactive. Please contact administrator!'))
            return
        }

        next()
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(500).json(errorResponse('Internal server error during authentication'))
    }
}

// Middleware to check if user is admin
export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.session.user) {
            res.status(401).json(errorResponse('Authentication required'))
            return
        }

        if (req.session.user.role !== 'ADMIN') {
            res.status(403).json(errorResponse('Admin access required. Insufficient permissions.'))
            return
        }

        next()
    } catch (error) {
        console.error('Admin middleware error:', error)
        res.status(500).json(errorResponse('Internal server error during authorization'))
    }
}

// Middleware to check if user can access their own data or is admin
export const requireOwnershipOrAdmin = (userIdParam: string = 'id') => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.session.user) {
                res.status(401).json(errorResponse('Authentication required'))
                return
            }

            const targetUserId = req.params[userIdParam]
            const currentUserId = req.session.user.id
            const currentUserRole = req.session.user.role

            // Allow if user is admin or accessing their own data
            if (currentUserRole === 'ADMIN' || currentUserId === targetUserId) {
                next()
                return
            }

            res.status(403).json(errorResponse('Access denied. You can only access your own data.'))
        } catch (error) {
            console.error('Ownership middleware error:', error)
            res.status(500).json(errorResponse('Internal server error during ownership check'))
        }
    }
}

// Middleware to check if user is already authenticated (for login routes)
export const requireGuest = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session.user) {
        res.status(400).json(errorResponse('You are already logged in'))
        return
    }
    next()
}
