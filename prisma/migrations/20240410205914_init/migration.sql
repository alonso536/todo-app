-- AlterTable
ALTER TABLE `todos` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `completedAt` DATETIME(3) NULL;
