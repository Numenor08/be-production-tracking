export enum StatusPesanan {
    DIPROSES = 'DIPROSES',
    DIPROSES_DAN_DIPECAH = 'DIPROSES_DAN_DIPECAH',
    SELESAI = 'SELESAI',
    IDLE = 'IDLE',
}

export enum ProcessStage {
    PREPROCESS = 'PREPROCESS',
    PROCESS = 'PROCESS',
    FINISHING = 'FINISHING',
}

export enum PaletStatus {
    READY = 'READY',
    SHIPPED = 'SHIPPED',
}

export enum PhaseStatus {
    NOT_STARTED = 'NOT_STARTED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
    SKIPPED = 'SKIPPED',
}

export enum ItemType {
    MATERIAL = 'MATERIAL',
    SEMI_FINISHED = 'SEMI_FINISHED',
    PRODUCT = 'PRODUCT',
}

export interface SalesOrderType {
    id: string
    code: string
    nama_cust: string
    total_harga: number
    tanggal_selesai: Date
    tanggal_pengiriman: Date
    createdAt: Date
    updatedAt: Date
    status: StatusPesanan
    Barang?: SalesOrderBarangType[]
    spks?: SPKType[]
    palets?: PaletType[]
}

export interface SPKType {
    id: string
    code: string
    tanggal_deadline_preprocess?: Date | null
    tanggal_deadline_process?: Date | null
    tanggal_deadline_finishing?: Date | null
    mesin_preprocess?: string | null
    mesin_process?: string | null
    mesin_finishing?: string | null
    start_stage: ProcessStage
    preprocess_status: PhaseStatus
    process_status: PhaseStatus
    finishing_status: PhaseStatus
    tanggal_mulai_preprocess?: Date | null
    tanggal_mulai_process?: Date | null
    tanggal_mulai_finishing?: Date | null
    createdAt: Date
    updatedAt: Date
    salesOrderId: string
    salesOrder?: SalesOrderType
    mesin1?: MesinType | null
    mesin2?: MesinType | null
    mesin3?: MesinType | null
    gudangs?: GudangType[]
    historiMesin?: HistoriMesinType[]
    SPKBarangs?: SpkBarangType[]
    SPKPhases?: SPKPhaseType[]
    laporan?: LaporanType
    PaletItem?: PaletItemType[]
}

export interface SPKPhaseType {
    id: string
    spk_id: string
    spk?: SPKType
    stage: ProcessStage
    target_quantity: number
    planned_waste: number
    actual_quantity: number
    actual_waste: number
    inventory_used: number
    barang_id: string
    barang?: BarangType
    start_date?: Date | null
    completion_date?: Date | null
    status: PhaseStatus
    createdAt: Date
    updatedAt: Date
}

export interface LaporanType {
    id: string
    preprocess_details?: string | null
    process_details?: string | null
    finishing_details?: string | null
    tanggal_selesai_preprocess?: Date | null
    tanggal_selesai_process?: Date | null
    tanggal_selesai_finishing?: Date | null
    preprocess_summary?: any | null
    process_summary?: any | null
    finishing_summary?: any | null
    createdAt: Date
    updatedAt: Date
    spk_id: string
    spk?: SPKType
    LaporanBarang?: LaporanBarangType[]
}

export interface LaporanBarangType {
    id: string
    laporan_id: string
    laporan?: LaporanType
    barang_id?: string | null
    barang?: BarangType | null
    fase: ProcessStage
    tipe: ItemType
    quantity: number
    waste_quantity: number
    inventory_used: number
    keterangan?: string | null
}

export interface GudangType {
    id: string
    stock: number
    waste_stock: number
    barangId: string
    barang?: BarangType
    spk_id?: string | null
    spk?: SPKType | null
    production_stage?: ProcessStage | null
    is_waste: boolean
    createdAt: Date
    updatedAt: Date
    PaletItem?: PaletItemType[]
}

export interface BarangType {
    id: string
    nama: string
    tipe: ItemType
    harga: number
    createdAt: Date
    updatedAt: Date
    salesOrders?: SalesOrderBarangType[]
    spkPhases?: SPKPhaseType[]
    Gudang?: GudangType[]
    spkBarangInput?: SpkBarangType[]
    spkBarangOutput?: SpkBarangType[]
    LaporanBarang?: LaporanBarangType[]
}

export interface SalesOrderBarangType {
    id: string
    salesOrderId: string
    salesOrder?: SalesOrderType
    barangId?: string | null
    Barang?: BarangType | null
    quantity: number
}

export interface MesinType {
    id: string
    Nama: string
    Detail: string
    type: ProcessStage
    createdAt: Date
    updatedAt: Date
    HistoriMesin?: HistoriMesinType[]
    spkMesinPreprocess?: SPKType[]
    spkMesinProcess?: SPKType[]
    spkMesinFinishing?: SPKType[]
}

export interface SpkBarangType {
    id: string
    spkId: string
    spk?: SPKType
    barang_input_Id: string
    barang?: BarangType
    barang_output_Id: string
    barang_output?: BarangType
    tipe: number
    quantity_input: number
    quantity_output: number
}

export interface HistoriMesinType {
    id: string
    mesinId: string
    sPKId: string
    Mesin?: MesinType
    SPK?: SPKType
    createdAt: Date
    updatedAt: Date
    status: number
    detail: string
}

export interface PaletType {
    id: string
    code: string
    status: PaletStatus
    qrcode_data: string
    sales_order_id: string
    salesOrder?: SalesOrderType
    createdAt: Date
    updatedAt: Date
    paletItems?: PaletItemType[]
}

export interface PaletItemType {
    id: string
    quantity: number
    palet_id: string
    palet?: PaletType
    item_id: string
    gudang?: GudangType
    spk_id: string
    spk?: SPKType
    createdAt: Date
    updatedAt: Date
}
