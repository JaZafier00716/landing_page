/*
  Warnings:

  - Added the required column `cvLinkText` to the `PersonDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonDetails" ADD COLUMN     "cvLinkText" TEXT NOT NULL;
