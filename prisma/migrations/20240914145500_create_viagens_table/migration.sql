/*
  Warnings:

  - You are about to alter the column `duracao` on the `viagens` table. The data in that column could be lost. The data in that column will be cast from `Int` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE `viagens` MODIFY `duracao` SMALLINT NOT NULL;
