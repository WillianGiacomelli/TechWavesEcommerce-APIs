-- CreateTable
CREATE TABLE `user.role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'MANAGER', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user.user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `middleName` VARCHAR(255) NOT NULL,
    `gender` CHAR(2) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `birthDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roleId` INTEGER NOT NULL,


    UNIQUE INDEX `user.user_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user.contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cellPhone` VARCHAR(21) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user.login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `user.login_email_key`(`email`),
    UNIQUE INDEX `user.login_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user.address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(11) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `user.address_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address.complement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` CHAR(2) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `street` VARCHAR(255) NOT NULL,
    `neighborhood` VARCHAR(255) NOT NULL,
    `number` INTEGER NOT NULL,
    `complement` VARCHAR(255) NOT NULL,
    `addressId` INTEGER NOT NULL,

    UNIQUE INDEX `address.complement_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user.user` ADD CONSTRAINT `user.user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `user.role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE `user.login` ADD CONSTRAINT `user.login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user.user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE `user.contact` ADD CONSTRAINT `user.contact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user.user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE `user.address` ADD CONSTRAINT `user.address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user.user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE `address.complement` ADD CONSTRAINT `address.complement_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `user.address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;