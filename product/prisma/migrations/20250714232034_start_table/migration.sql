-- CreateTable
CREATE TABLE `user.role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('MANAGER', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user.user` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product.category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `product.category_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product.product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `sku` VARCHAR(50) NULL,
    `imageUrl` VARCHAR(500) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product.product_sku_key`(`sku`),
    INDEX `product.product_name_sku_idx`(`name`, `sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductCategory_AB_unique`(`A`, `B`),
    INDEX `_ProductCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user.user` ADD CONSTRAINT `user.user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `user.role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product.product` ADD CONSTRAINT `product.product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user.user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCategory` ADD CONSTRAINT `_ProductCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `product.category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductCategory` ADD CONSTRAINT `_ProductCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `product.product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
