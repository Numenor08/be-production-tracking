import { PrismaClient } from '../../generated/prisma'
import { ItemType, ProcessStage } from '../types/types'

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

export const generatePalletCode = async (): Promise<string> => {
    let attempt = 0
    const maxAttempts = 5

    while (attempt < maxAttempts) {
        const date = new Date()
        const year = date.getFullYear().toString().slice(2)
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')

        const random = Math.floor(1000 + Math.random() * 9000)

        const code = `PLT-${year}${month}${day}-${random}`

        const existing = await prisma.pallet.findFirst({
            where: { code },
        })

        if (!existing) {
            return code
        }

        attempt++
    }

    throw new Error('Failed to generate unique pallet code')
}

export const generateReportCode = async (spkId: string, stage: ProcessStage): Promise<string> => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    let stageCode: string
    switch (stage) {
        case 'PREPROCESS':
            stageCode = 'PRE'
            break
        case 'PROCESS':
            stageCode = 'PRO'
            break
        case 'FINISHING':
            stageCode = 'FIN'
            break
        default:
            stageCode = 'UNK'
    }

    const count = await prisma.productionReport.count({
        where: { 
            spkPhase: {
                spkId,
                stage
            }
        },
    })

    const sequence = (count + 1).toString().padStart(2, '0')
    
    const spkData = await prisma.sPK.findUnique({
        where: { id: spkId },
        select: { code: true }
    })
    
    const spkPrefix = spkData?.code?.split('/')[0] || 'XXXX'

    return `RPT-${spkPrefix}-${stageCode}-${year}${month}${day}-${sequence}`
}

export const generateItemCode = async (itemType: ItemType): Promise<string> => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).toString().padStart(2, '0')
    
    let typeCode: string
    switch (itemType) {
        case 'MATERIAL':
            typeCode = 'M'
            break
        case 'SEMI_FINISHED':
            typeCode = 'S'
            break
        case 'PRODUCT':
            typeCode = 'P'
            break
        default:
            typeCode = 'X'
    }

    const lastItem = await prisma.item.findFirst({
        where: {
            code: {
                startsWith: `ITEM-${typeCode}${year}${month}-`
            },
            type: itemType
        },
        orderBy: {
            code: 'desc'
        }
    })

    let sequence = 1
    if (lastItem?.code) {
        const parts = lastItem.code.split('-')
        if (parts.length === 3) {
            const lastSequence = parseInt(parts[2])
            if (!isNaN(lastSequence)) {
                sequence = lastSequence + 1
            }
        }
    }

    return `ITEM-${typeCode}${year}${month}-${sequence.toString().padStart(4, '0')}`
}

export const generateMachineCode = async (stage: ProcessStage): Promise<string> => {
    let stageCode: string
    switch (stage) {
        case 'PREPROCESS':
            stageCode = 'PRE'
            break
        case 'PROCESS':
            stageCode = 'PRO'
            break
        case 'FINISHING':
            stageCode = 'FIN'
            break
        default:
            stageCode = 'UNK'
    }
    
    const lastMachine = await prisma.machine.findFirst({
        where: {
            code: {
                startsWith: `MC-${stageCode}`
            }
        },
        orderBy: {
            code: 'desc'
        }
    })

    let sequence = 1
    if (lastMachine) {
        const codePart = lastMachine.code.replace(`MC-${stageCode}`, '')
        const lastSequence = parseInt(codePart)
        if (!isNaN(lastSequence)) {
            sequence = lastSequence + 1
        }
    }

    return `MC-${stageCode}${sequence.toString().padStart(3, '0')}`
}

export const generateDeliveryCode = async (): Promise<string> => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const todayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)

    const lastDelivery = await prisma.deliveryOrder.findFirst({
        where: {
            createdAt: {
                gte: todayStart,
                lt: todayEnd
            }
        },
        orderBy: {
            code: 'desc'
        }
    })

    let sequence = 1
    if (lastDelivery?.code) {
        const parts = lastDelivery.code.split('-')
        if (parts.length === 3) {
            const lastSequence = parseInt(parts[2])
            if (!isNaN(lastSequence)) {
                sequence = lastSequence + 1
            }
        }
    }

    return `SJ-${year}${month}${day}-${sequence.toString().padStart(3, '0')}`
}

