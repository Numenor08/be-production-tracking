-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('ADMIN', 'OPERATOR') NOT NULL DEFAULT 'OPERATOR',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_password_key`(`password`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    INDEX `Session_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contactPerson` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrder` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `completionDate` DATETIME(3) NOT NULL,
    `deliveryDate` DATETIME(3) NULL,
    `status` ENUM('IN_PROGRESS', 'COMPLETED', 'DELIVERED', 'IDLE') NOT NULL DEFAULT 'IDLE',
    `customerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SalesOrder_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SPK` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `preprocessDeadline` DATETIME(3) NULL,
    `processDeadline` DATETIME(3) NULL,
    `finishingDeadline` DATETIME(3) NULL,
    `preprocessMachineId` VARCHAR(191) NULL,
    `processMachineId` VARCHAR(191) NULL,
    `finishingMachineId` VARCHAR(191) NULL,
    `salesOrderId` VARCHAR(191) NOT NULL,
    `salesOrderItemId` VARCHAR(191) NOT NULL,
    `targetQuantity` INTEGER NOT NULL,
    `startStage` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL DEFAULT 'PREPROCESS',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SPK_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SPK_Phase` (
    `id` VARCHAR(191) NOT NULL,
    `spkId` VARCHAR(191) NOT NULL,
    `stage` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL,
    `startDate` DATETIME(3) NULL,
    `completionDate` DATETIME(3) NULL,
    `status` ENUM('NOT_STARTED', 'ONGOING', 'COMPLETED', 'SKIPPED') NOT NULL DEFAULT 'NOT_STARTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SPK_Phase_spkId_stage_key`(`spkId`, `stage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SPK_Item` (
    `id` VARCHAR(191) NOT NULL,
    `spkId` VARCHAR(191) NOT NULL,
    `phaseId` VARCHAR(191) NULL,
    `outputItemId` VARCHAR(191) NULL,
    `type` ENUM('MATERIAL', 'SEMI_FINISHED', 'PRODUCT') NOT NULL,
    `outputQuantity` INTEGER NOT NULL DEFAULT 0,
    `wasteQuantity` INTEGER NOT NULL DEFAULT 0,
    `targetOutputQuantity` INTEGER NOT NULL,
    `targetWaste` INTEGER NOT NULL DEFAULT 0,
    `storageUsed` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SPK_InputItem` (
    `id` VARCHAR(191) NOT NULL,
    `spkItemId` VARCHAR(191) NOT NULL,
    `inputItemId` VARCHAR(191) NOT NULL,
    `inputQuantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SPK_InputItem_spkItemId_inputItemId_key`(`spkItemId`, `inputItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `preprocessDetails` VARCHAR(191) NULL,
    `processDetails` VARCHAR(191) NULL,
    `finishingDetails` VARCHAR(191) NULL,
    `preprocessCompletionDate` DATETIME(3) NULL,
    `processCompletionDate` DATETIME(3) NULL,
    `finishingCompletionDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `spkId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Report_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportItem` (
    `id` VARCHAR(191) NOT NULL,
    `reportId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NULL,
    `storageId` VARCHAR(191) NULL,
    `phase` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `wasteQuantity` INTEGER NOT NULL DEFAULT 0,
    `storageUsed` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Storage` (
    `id` VARCHAR(191) NOT NULL,
    `spkId` VARCHAR(191) NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `spkStage` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Storage_spkId_itemId_spkStage_key`(`spkId`, `itemId`, `spkStage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('MATERIAL', 'SEMI_FINISHED', 'PRODUCT') NOT NULL,
    `price` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Item_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `salesOrderId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NULL,
    `targetQuantity` INTEGER NOT NULL,
    `remainingQuantity` INTEGER NOT NULL,
    `actualQuantity` INTEGER NOT NULL DEFAULT 0,
    `fullyPlanned` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `SalesOrderItem_salesOrderId_itemId_key`(`salesOrderId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Machine` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `type` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MachineHistory` (
    `id` VARCHAR(191) NOT NULL,
    `machineId` VARCHAR(191) NOT NULL,
    `spkId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MachineHistory_machineId_spkId_key`(`machineId`, `spkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pallet` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `status` ENUM('NOT_READY', 'READY', 'SHIPPED') NOT NULL DEFAULT 'READY',
    `qrCodeData` VARCHAR(191) NULL,
    `salesOrderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deliveryOrderId` VARCHAR(191) NULL,

    UNIQUE INDEX `Pallet_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PalletItem` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `palletId` VARCHAR(191) NOT NULL,
    `storageItemId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PalletItem_palletId_storageItemId_key`(`palletId`, `storageItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeliveryOrder` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `deliveryDate` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'IN_TRANSIT', 'DELIVERED') NOT NULL DEFAULT 'PENDING',
    `salesOrderId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DeliveryOrder_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalesOrder` ADD CONSTRAINT `SalesOrder_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK` ADD CONSTRAINT `SPK_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK` ADD CONSTRAINT `SPK_salesOrderItemId_fkey` FOREIGN KEY (`salesOrderItemId`) REFERENCES `SalesOrderItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK` ADD CONSTRAINT `SPK_preprocessMachineId_fkey` FOREIGN KEY (`preprocessMachineId`) REFERENCES `Machine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK` ADD CONSTRAINT `SPK_processMachineId_fkey` FOREIGN KEY (`processMachineId`) REFERENCES `Machine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK` ADD CONSTRAINT `SPK_finishingMachineId_fkey` FOREIGN KEY (`finishingMachineId`) REFERENCES `Machine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_Phase` ADD CONSTRAINT `SPK_Phase_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_Item` ADD CONSTRAINT `SPK_Item_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_Item` ADD CONSTRAINT `SPK_Item_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `SPK_Phase`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_Item` ADD CONSTRAINT `SPK_Item_outputItemId_fkey` FOREIGN KEY (`outputItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_InputItem` ADD CONSTRAINT `SPK_InputItem_spkItemId_fkey` FOREIGN KEY (`spkItemId`) REFERENCES `SPK_Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SPK_InputItem` ADD CONSTRAINT `SPK_InputItem_inputItemId_fkey` FOREIGN KEY (`inputItemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportItem` ADD CONSTRAINT `ReportItem_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportItem` ADD CONSTRAINT `ReportItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportItem` ADD CONSTRAINT `ReportItem_storageId_fkey` FOREIGN KEY (`storageId`) REFERENCES `Storage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Storage` ADD CONSTRAINT `Storage_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Storage` ADD CONSTRAINT `Storage_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesOrderItem` ADD CONSTRAINT `SalesOrderItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MachineHistory` ADD CONSTRAINT `MachineHistory_machineId_fkey` FOREIGN KEY (`machineId`) REFERENCES `Machine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MachineHistory` ADD CONSTRAINT `MachineHistory_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pallet` ADD CONSTRAINT `Pallet_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pallet` ADD CONSTRAINT `Pallet_deliveryOrderId_fkey` FOREIGN KEY (`deliveryOrderId`) REFERENCES `DeliveryOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PalletItem` ADD CONSTRAINT `PalletItem_palletId_fkey` FOREIGN KEY (`palletId`) REFERENCES `Pallet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PalletItem` ADD CONSTRAINT `PalletItem_storageItemId_fkey` FOREIGN KEY (`storageItemId`) REFERENCES `Storage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryOrder` ADD CONSTRAINT `DeliveryOrder_salesOrderId_fkey` FOREIGN KEY (`salesOrderId`) REFERENCES `SalesOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
