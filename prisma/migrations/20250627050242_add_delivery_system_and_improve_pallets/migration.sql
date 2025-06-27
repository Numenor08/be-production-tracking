/*
  Warnings:

  - You are about to drop the `report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reportitem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[salesOrderId]` on the table `DeliveryOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Machine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Pallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxQuantity` to the `Pallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `report` DROP FOREIGN KEY `Report_spkId_fkey`;

-- DropForeignKey
ALTER TABLE `reportitem` DROP FOREIGN KEY `ReportItem_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `reportitem` DROP FOREIGN KEY `ReportItem_reportId_fkey`;

-- DropForeignKey
ALTER TABLE `reportitem` DROP FOREIGN KEY `ReportItem_storageId_fkey`;

-- DropForeignKey
ALTER TABLE `storage` DROP FOREIGN KEY `Storage_spkId_fkey`;

-- AlterTable
ALTER TABLE `machine` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pallet` ADD COLUMN `currentQuantity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `itemId` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxQuantity` INTEGER NOT NULL,
    MODIFY `status` ENUM('NOT_READY', 'READY', 'SHIPPED') NOT NULL DEFAULT 'NOT_READY';

-- AlterTable
ALTER TABLE `salesorder` ADD COLUMN `maxQuantityPerPallet` INTEGER NOT NULL DEFAULT 50;

-- DropTable
DROP TABLE `report`;

-- DropTable
DROP TABLE `reportitem`;

-- CreateTable
CREATE TABLE `ProductionReport` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `spkPhaseId` VARCHAR(191) NOT NULL,
    `stage` ENUM('PREPROCESS', 'PROCESS', 'FINISHING') NOT NULL,
    `confirmedByUserId` VARCHAR(191) NULL,
    `confirmedDate` DATETIME(3) NULL,
    `spkItemId` VARCHAR(191) NOT NULL,
    `targetQuantity` INTEGER NOT NULL,
    `actualQuantity` INTEGER NOT NULL,
    `wasteQuantity` INTEGER NOT NULL,
    `totalStorageUsed` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,
    `tags` JSON NULL,
    `differenceToTarget` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductionReport_code_key`(`code`),
    UNIQUE INDEX `ProductionReport_spkPhaseId_key`(`spkPhaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DeliveryOrder_salesOrderId_key` ON `DeliveryOrder`(`salesOrderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Item_name_key` ON `Item`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Machine_code_key` ON `Machine`(`code`);

-- AddForeignKey
ALTER TABLE `Storage` ADD CONSTRAINT `Storage_spkId_fkey` FOREIGN KEY (`spkId`) REFERENCES `SPK`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pallet` ADD CONSTRAINT `Pallet_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReport` ADD CONSTRAINT `ProductionReport_spkPhaseId_fkey` FOREIGN KEY (`spkPhaseId`) REFERENCES `SPK_Phase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReport` ADD CONSTRAINT `ProductionReport_confirmedByUserId_fkey` FOREIGN KEY (`confirmedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionReport` ADD CONSTRAINT `ProductionReport_spkItemId_fkey` FOREIGN KEY (`spkItemId`) REFERENCES `SPK_Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
