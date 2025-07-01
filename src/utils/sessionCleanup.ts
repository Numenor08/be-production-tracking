import { PrismaClient } from '../../generated/prisma'
import cron from 'node-cron'
const prisma = new PrismaClient()
export const cleanupExpiredSessions = async () => {
    try {
        const deletedSessions = await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
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
export const startSessionCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('🔄 Running daily session cleanup...')
        await cleanupExpiredSessions()
    })
    console.log('🔄 Running initial session cleanup...')
    cleanupExpiredSessions().finally(() => {
        console.log('✅ Initial session cleanup completed')
    })
}
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

