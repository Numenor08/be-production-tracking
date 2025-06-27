import { PrismaClient } from '../../generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const seedAdminUser = async () => {
    try {
        // Check if admin user already exists
        const existingAdmin = await prisma.user.findFirst({
            where: { role: 'ADMIN' },
        })

        if (existingAdmin) {
            console.log('❌ Admin user already exists')
            console.log('Please remove the existing admin user before running the seeder again.')
            return
        }

        // Hash password for admin
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash('Admin123!', saltRounds)

        // Create admin user
        const adminUser = await prisma.user.create({
            data: {
                username: 'admin',
                password: hashedPassword,
                firstName: 'System',
                lastName: 'Administrator',
                email: 'admin@production-tracking.com',
                phone: '+62-000-0000-0000',
                role: 'ADMIN',
                isActive: true,
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        })

        console.log('✅ Admin user created successfully:')
        console.log({
            ...adminUser,
            defaultPassword: 'Admin123!',
        })
        console.log('⚠️  Please change the default password after first login!')
    } catch (error) {
        console.error('❌ Error creating admin user:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Run seeder if called directly
if (require.main === module) {
    seedAdminUser()
}

export { seedAdminUser }
