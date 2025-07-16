/*
  Warnings:

  - You are about to drop the column `promotionId` on the `product.product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `product.promotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product.product` DROP FOREIGN KEY `product.product_promotionId_fkey`;

-- DropIndex
DROP INDEX `product.product_promotionId_fkey` ON `product.product`;

-- AlterTable
ALTER TABLE `product.product` DROP COLUMN `promotionId`;

-- AlterTable
ALTER TABLE `product.promotion` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product.promotion` ADD CONSTRAINT `product.promotion_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product.product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
