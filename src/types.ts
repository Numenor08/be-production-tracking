export enum OrderStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    SPLIT_PROCESSING = 'SPLIT_PROCESSING',
    COMPLETED = 'COMPLETED',
    IDLE = 'IDLE',
}

export enum ProcessStage {
    PREPROCESS = 'PREPROCESS',
    PROCESS = 'PROCESS',
    FINISHING = 'FINISHING',
}

export enum PalletStatus {
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

export interface SalesOrder {
    id: string;
    code: string;
    customerName: string;
    totalPrice: number;
    completionDate: Date;
    deliveryDate: Date;
    createdAt: Date;
    updatedAt: Date;
    items?: SalesOrderItem[];
    productionOrders?: SPK[];
    status: OrderStatus;
    pallets?: Pallet[];
}

export interface SPK {
    id: string;
    code: string;
    preprocessDeadline?: Date | null;
    processDeadline?: Date | null;
    finishingDeadline?: Date | null;
    preprocessMachineId?: string | null;
    processMachineId?: string | null;
    finishingMachineId?: string | null;
    startStage: ProcessStage;
    preprocessStatus: PhaseStatus;
    processStatus: PhaseStatus;
    finishingStatus: PhaseStatus;
    preprocessStartDate?: Date | null;
    processStartDate?: Date | null;
    finishingStartDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    preprocessMachine?: Machine | null;
    processMachine?: Machine | null;
    finishingMachine?: Machine | null;
    salesOrder?: SalesOrder;
    salesOrderId: string;
    storageItems?: Storage[];
    machineHistory?: MachineHistory[];
    productionItems?: ProductionItem[];
    phases?: SPK_Phase[];
    report?: Report;
    palletItems?: PalletItem[];
}

export interface SPK_Phase {
    id: string;
    productionOrder?: SPK;
    productionOrderId: string;
    stage: ProcessStage;
    targetQuantity: number;
    plannedWaste: number;
    actualQuantity: number;
    actualWaste: number;
    storageUsed: number;
    productId: string;
    product?: Product;
    startDate?: Date | null;
    completionDate?: Date | null;
    status: PhaseStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Report {
    id: string;
    preprocessDetails?: string | null;
    processDetails?: string | null;
    finishingDetails?: string | null;
    preprocessCompletionDate?: Date | null;
    processCompletionDate?: Date | null;
    finishingCompletionDate?: Date | null;
    preprocessSummary?: any | null;
    processSummary?: any | null;
    finishingSummary?: any | null;
    createdAt: Date;
    updatedAt: Date;
    productionOrderId: string;
    productionOrder?: SPK;
    reportItems?: ReportItem[];
}

export interface ReportItem {
    id: string;
    reportId: string;
    report?: Report;
    productId?: string | null;
    product?: Product | null;
    phase: ProcessStage;
    itemType: ItemType;
    quantity: number;
    wasteQuantity: number;
    storageUsed: number;
    notes?: string | null;
}

export interface Storage {
    id: string;
    stock: number;
    wasteStock: number;
    productId: string;
    product?: Product;
    productionOrderId?: string | null;
    productionOrder?: SPK | null;
    productionStage?: ProcessStage | null;
    isWaste: boolean;
    createdAt: Date;
    updatedAt: Date;
    palletItems?: PalletItem[];
}

export interface Product {
    id: string;
    name: string;
    type: ItemType;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    salesOrderItems?: SalesOrderItem[];
    productionPhases?: SPK_Phase[];
    storageItems?: Storage[];
    inputItems?: ProductionItem[];
    outputItems?: ProductionItem[];
    reportItems?: ReportItem[];
}

export interface SalesOrderItem {
    id: string;
    salesOrderId: string;
    salesOrder?: SalesOrder;
    productId?: string | null;
    product?: Product | null;
    quantity: number;
}

export interface Machine {
    id: string;
    name: string;
    details: string;
    type: ProcessStage;
    createdAt: Date;
    updatedAt: Date;
    history?: MachineHistory[];
    preprocessOrders?: SPK[];
    processOrders?: SPK[];
    finishingOrders?: SPK[];
}

export interface ProductionItem {
    id: string;
    productionOrderId: string;
    productionOrder?: SPK;
    inputProductId: string;
    inputProduct?: Product;
    outputProductId: string;
    outputProduct?: Product;
    type: number;
    inputQuantity: number;
    outputQuantity: number;
}

export interface MachineHistory {
    id: string;
    machineId: string;
    productionOrderId: string;
    machine?: Machine;
    productionOrder?: SPK;
    createdAt: Date;
    updatedAt: Date;
    status: number;
    details: string;
}

export interface Pallet {
    id: string;
    code: string;
    status: PalletStatus;
    qrCodeData: string;
    salesOrderId: string;
    salesOrder?: SalesOrder;
    createdAt: Date;
    updatedAt: Date;
    items?: PalletItem[];
}

export interface PalletItem {
    id: string;
    quantity: number;
    palletId: string;
    pallet?: Pallet;
    storageItemId: string;
    storageItem?: Storage;
    productionOrderId: string;
    productionOrder?: SPK;
    createdAt: Date;
    updatedAt: Date;
}