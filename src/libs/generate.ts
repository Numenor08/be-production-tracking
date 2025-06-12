import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient();

async function generateSOCode() {
    const now = new Date()
    const yearMonth =
        now.getFullYear().toString().slice(-2) +
        (now.getMonth() + 1).toString().padStart(2, '0') // YYMM

    const lastOrder = await prisma.sales_Order.findFirst({
        where: {
            code: {
                startsWith: `SO-${yearMonth}-`
            }
        },
        orderBy: {
            code: 'desc'
        }
    });

    let sequence = 1
    if (lastOrder) {
        const lastSequence = parseInt(lastOrder.code.split('-')[2])
        sequence = lastSequence + 1
    }

    return `SO-${yearMonth}-${sequence.toString().padStart(8, '0')}`
}

export { generateSOCode };