/*
  Warnings:

  - You are about to drop the `_productcategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `product.product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionId` to the `product.product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_productcategory` DROP FOREIGN KEY `_ProductCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productcategory` DROP FOREIGN KEY `_ProductCategory_B_fkey`;

-- AlterTable
ALTER TABLE `product.product` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `promotionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_productcategory`;

-- CreateTable
CREATE TABLE `product.promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `discountType` ENUM('PERCENTAGE', 'FIXED') NOT NULL,
    `discountValue` DECIMAL(10, 2) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `product.promotion_startDate_endDate_isActive_idx`(`startDate`, `endDate`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product.product` ADD CONSTRAINT `product.product_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `product.promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product.product` ADD CONSTRAINT `product.product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `product.category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product.promotion` ADD CONSTRAINT `product.promotion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user.user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
