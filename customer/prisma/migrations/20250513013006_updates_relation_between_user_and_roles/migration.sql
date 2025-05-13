-- DropForeignKey
ALTER TABLE `user.user` DROP FOREIGN KEY `user.user_roleId_fkey`;

-- DropIndex
DROP INDEX `user.user_roleId_key` ON `user.user`;

-- AddForeignKey
ALTER TABLE `user.user` ADD CONSTRAINT `user.user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `user.role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
