/*
  Warnings:

  - You are about to drop the column `description` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `levelFrom` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `levelTo` on the `Roadmap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "description",
DROP COLUMN "levelFrom",
DROP COLUMN "levelTo";
