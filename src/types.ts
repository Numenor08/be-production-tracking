export interface SalesOrderType {
    id: string
    code: string
    nama_cust: string
    jumlah_product: number
    total_harga: number
    tanggal_selesai: Date
    tanggal_pengiriman: Date
    createdAt: Date
    updatedAt: Date
    spkId?: string | null
}

export interface SPKType {
    id: string
    createdAt: Date
    updatedAt: Date
}

export interface GudangType {
    id: string
    nama: string
    tipe: number
    Stock: number
    harga: number
    spkId: string
    createdAt: Date
    updatedAt: Date
}

export interface SalesOrderGudangType {
    id: string
    salesOrderId: string
    gudangId: string
    quantity: number
}

export interface ScheduleType {
    id: string
    details: string
    tanggal: Date
    spkId: string
    createdAt: Date
    updatedAt: Date
}

export interface MesinType {
    id: string
    Nama: string
    Detail: string
    createdAt: Date
    updatedAt: Date
}

export interface SPKScheduleType {
    id: string
    spkId: string
    scheduleId: string
    tipe: number
}

export interface HistoriMesinType {
    id: string
    mesinId: string
    sPKId: string
    createdAt: Date
    updatedAt: Date
    status: number
    detail: string
}
