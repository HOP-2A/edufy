/*
  Warnings:

  - You are about to drop the column `description` on the `LearningSection` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Roadmap` table. All the data in the column will be lost.
  - You are about to drop the column `roadmapId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `LearningSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `LearningSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelFrom` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelTo` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Roadmap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `learningSectionId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_learningSectionId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roadmapId_fkey";

-- AlterTable
ALTER TABLE "LearningSection" DROP COLUMN "description",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roadmap" DROP COLUMN "endDate",
DROP COLUMN "parentId",
DROP COLUMN "projectId",
DROP COLUMN "startDate",
DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "levelFrom" TEXT NOT NULL,
ADD COLUMN     "levelTo" TEXT NOT NULL,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "roadmapId",
ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "learningSectionId" SET NOT NULL;

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Question";

-- DropEnum
DROP TYPE "RoadmapType";

-- CreateTable
CREATE TABLE "ProjectQuestion" (
    "id" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT,

    CONSTRAINT "ProjectQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskQuestion" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "userAnswer" TEXT,
    "isCorrect" BOOLEAN DEFAULT false,

    CONSTRAINT "TaskQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectQuestion" ADD CONSTRAINT "ProjectQuestion_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_learningSectionId_fkey" FOREIGN KEY ("learningSectionId") REFERENCES "LearningSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskQuestion" ADD CONSTRAINT "TaskQuestion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
