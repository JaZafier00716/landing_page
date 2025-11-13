/*
  Warnings:

  - You are about to drop the column `items` on the `SkillCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SkillCategory" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "SkillsItems" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,

    CONSTRAINT "SkillsItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillsItems" ADD CONSTRAINT "SkillsItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
