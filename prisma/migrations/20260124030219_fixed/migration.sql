/*
  Warnings:

  - You are about to drop the column `duration` on the `Roadmap` table. All the data in the column will be lost.
  - Made the column `purpose` on table `Roadmap` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "duration",
ALTER COLUMN "purpose" SET NOT NULL;
