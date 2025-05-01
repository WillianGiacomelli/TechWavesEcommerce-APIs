/*
  Warnings:

  - You are about to drop the column `role` on the `user.user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `user.user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `user.user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user.user` DROP COLUMN `role`,
    ADD COLUMN `roleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `user.role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'MANAGER', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user.user_roleId_key` ON `user.user`(`roleId`);

-- AddForeignKey
ALTER TABLE `user.user` ADD CONSTRAINT `user.user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `user.role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
