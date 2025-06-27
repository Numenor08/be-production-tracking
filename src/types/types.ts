export enum OrderStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    DELIVERED = 'DELIVERED',
    IDLE = 'IDLE',
}

export enum ProcessStage {
    PREPROCESS = 'PREPROCESS',
    PROCESS = 'PROCESS',
    FINISHING = 'FINISHING',
}

export enum PalletStatus {
    NOT_READY = 'NOT_READY',
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

export enum DeliveryStatus {
    PENDING = 'PENDING',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
}

export enum UserRole {
    ADMIN = 'ADMIN',
    OPERATOR = 'OPERATOR',
}

export enum ProductionReportTag {
    STORAGE_USED = 'STORAGE_USED',
    WASTE_USED = 'WASTE_USED',
    BELOW_TARGET = 'BELOW_TARGET',
    FULL_PLANNED = 'FULL_PLANNED',
    ABOVE_TARGET = 'ABOVE_TARGET',
}

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    phone?: string | null;
    isActive: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    report?: ProductionReport[];
}

export interface Session {
    id: string;
    sid: string;
    data: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    name: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    contactPerson?: string | null;
    createdAt: Date;
    updatedAt: Date;
    salesOrders?: SalesOrder[];
}

export interface SalesOrder {
    id: string;
    code: string;
    totalPrice: number;
    completionDate: Date;
    deliveryDate?: Date | null;
    status: OrderStatus;
    maxQuantityPerPallet: number; // New field
    customerId: string;
    customer?: Customer;
    createdAt: Date;
    updatedAt: Date;
    items?: SalesOrderItem[];
    spk?: SPK[];
    pallets?: Pallet[];
    deliveryOrders?: DeliveryOrder;
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
    salesOrderId: string;
    salesOrder?: SalesOrder;
    salesOrderItemId: string;
    salesOrderItem?: SalesOrderItem;
    targetQuantity: number;
    startStage: ProcessStage;
    createdAt: Date;
    updatedAt: Date;
    preprocessMachine?: Machine | null;
    processMachine?: Machine | null;
    finishingMachine?: Machine | null;
    storageItems?: Storage[];
    machineHistory?: MachineHistory[];
    spkItems?: SPK_Item[];
    phases?: SPK_Phase[];
}

export interface SPK_Phase {
    id: string;
    spkId: string;
    spk?: SPK;
    stage: ProcessStage;
    startDate?: Date | null;
    completionDate?: Date | null;
    status: PhaseStatus;
    createdAt: Date;
    updatedAt: Date;
    spkItems?: SPK_Item[];
    productionReport?: ProductionReport | null;
}

export interface SPK_Item {
    id: string;
    spkId: string;
    spk?: SPK;
    phaseId?: string | null;
    phase?: SPK_Phase | null;
    outputItemId?: string | null;
    outputItem?: Item | null;
    inputItems?: SPK_InputItem[];
    type: ItemType;
    outputQuantity: number;
    wasteQuantity: number;
    targetOutputQuantity: number;
    targetWaste: number;
    storageUsed: number;
    createdAt: Date;
    updatedAt: Date;
    productionReports?: ProductionReport[];
}

export interface SPK_InputItem {
    id: string;
    spkItemId: string;
    spkItem?: SPK_Item;
    inputItemId: string;
    inputItem?: Item;
    inputQuantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Storage {
    id: string;
    spkId?: string | null;
    spk?: SPK | null;
    itemId: string;
    item?: Item;
    spkStage: ProcessStage;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    palletItems?: PalletItem[];
}

export interface Item {
    id: string;
    code: string;
    name: string;
    type: ItemType;
    price?: number | null;
    createdAt: Date;
    updatedAt: Date;
    salesOrderItems?: SalesOrderItem[];
    storageItems?: Storage[];
    inputItemRelations?: SPK_InputItem[];
    outputItems?: SPK_Item[];
    pallets?: Pallet[]; // New field
}

export interface SalesOrderItem {
    id: string;
    salesOrderId: string;
    salesOrder?: SalesOrder;
    itemId?: string | null;
    item?: Item | null;
    targetQuantity: number;
    remainingQuantity: number;
    actualQuantity: number;
    fullyPlanned: boolean;
    spks?: SPK[];
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

export interface MachineHistory {
    id: string;
    machineId: string;
    machine?: Machine;
    spkId: string;
    spk?: SPK;
    createdAt: Date;
    updatedAt: Date;
    details: string;
}

export interface Pallet {
    id: string;
    code: string;
    status: PalletStatus;
    qrCodeData?: string | null;
    currentQuantity: number; // New field
    maxQuantity: number; // New field
    salesOrderId: string;
    salesOrder?: SalesOrder;
    itemId: string; // New field
    item?: Item; // New field
    deliveryOrderId?: string | null;
    deliveryOrder?: DeliveryOrder | null;
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
}

export interface DeliveryOrder {
    id: string;
    code: string;
    deliveryDate: Date;
    status: DeliveryStatus;
    salesOrderId: string;
    salesOrder?: SalesOrder;
    notes?: string | null;
    createdAt: Date;
    updatedAt: Date;
    pallets?: Pallet[];
}

export interface ProductionReport {
    id: string;
    code: string;
    spkPhaseId: string;
    spkPhase?: SPK_Phase;
    stage: ProcessStage;
    confirmedByUserId?: string | null;
    confirmedByUser?: User | null;
    confirmedAt?: Date | null;
    spkItemId: string;
    spkItem?: SPK_Item;
    targetQuantity: number;
    actualQuantity: number;
    wasteQuantity: number;
    totalStorageUsed: number;
    notes?: string | null;
    tags?: ProductionReportTag[];
    differenceToTarget: number;
    createdAt: Date;
    updatedAt: Date;
}