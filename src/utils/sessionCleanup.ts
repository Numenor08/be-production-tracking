import { PrismaClient } from '../../generated/prisma'
import cron from 'node-cron'

const prisma = new PrismaClient()

/**
 * Cleanup expired sessions from database
 */
export const cleanupExpiredSessions = async () => {
    try {
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(), // Delete sessions that have expired
                },
            },
        })

        console.log(`🧹 Cleaned up ${deletedSessions.count} expired sessions`)
        return deletedSessions.count
    } catch (error) {
        console.error('❌ Error cleaning up expired sessions:', error)
        return 0
    }
}

/**
 * Start automatic session cleanup
 * Runs every hour to clean up expired sessions
 */
export const startSessionCleanup = () => {
    // Run cleanup every 24 hours
    cron.schedule('0 0 * * *', async () => {
        console.log('🔄 Running daily session cleanup...')
        await cleanupExpiredSessions()
    })

    // Run initial cleanup on startup
    console.log('🔄 Running initial session cleanup...')
    cleanupExpiredSessions().finally(() => {
        console.log('✅ Initial session cleanup completed')
    })
}

/**
 * Get session statistics
 */
export const getSessionStats = async () => {
    try {
        const totalSessions = await prisma.session.count()
        const activeSessions = await prisma.session.count({
            where: {
                expiresAt: {
                    gt: new Date(),
                },
            },
        })
        const expiredSessions = totalSessions - activeSessions

        return {
            total: totalSessions,
            active: activeSessions,
            expired: expiredSessions,
        }
    } catch (error) {
        console.error('❌ Error getting session stats:', error)
        return {
            total: 0,
            active: 0,
            expired: 0,
        }
    }
}
