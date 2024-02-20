/*
  Warnings:

  - You are about to drop the column `leaving_membership_date` on the `ManancialMembers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ManancialMembers" DROP COLUMN "leaving_membership_date",
ADD COLUMN     "exit_membership_date" TIMESTAMP(3);
