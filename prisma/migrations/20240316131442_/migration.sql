/*
  Warnings:

  - Made the column `role` on table `ManancialMembers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ManancialMembers" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DATA TYPE INTEGER;
