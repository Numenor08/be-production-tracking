import { PrismaClient } from '../../generated/prisma'

const prisma = new PrismaClient()

export async function generateSOCode() {
    const now = new Date()
    const yearMonth =
        now.getFullYear().toString().slice(-2) +
        (now.getMonth() + 1).toString().padStart(2, '0') 

    const lastOrder = await prisma.salesOrder.findFirst({
        where: {
            code: {
                startsWith: `SO-${yearMonth}-`,
            },
        },
        orderBy: {
            code: 'desc',
        },
    })

    let sequence = 1
    if (lastOrder) {
        const lastSequence = parseInt(lastOrder.code.split('-')[2])
        sequence = lastSequence + 1
    }

    return `SO-${yearMonth}-${sequence.toString().padStart(8, '0')}`
}

export async function generateSPKCode(): Promise<string> {
    const now = new Date()
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0')
    const currentYear = now.getFullYear().toString().slice(-2)
    const period = `${currentMonth}-${currentYear}`

    const lastSPK = await prisma.sPK.findFirst({
        where: {
            code: {
                contains: `/SPK/${period}`,
            },
        },
        orderBy: {
            code: 'desc',
        },
    })

    let nextSequence = 1
    if (lastSPK?.code) {
        const lastSequence = parseInt(lastSPK.code.split('/')[0])
        if (!isNaN(lastSequence)) {
            nextSequence = lastSequence + 1
        }
    }

    const sequencePart = nextSequence.toString().padStart(4, '0')

    return `${sequencePart}/SPK/${period}`
}