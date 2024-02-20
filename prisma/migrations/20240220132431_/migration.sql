/*
  Warnings:

  - You are about to drop the column `ambiente` on the `LogsAplicacoes` table. All the data in the column will be lost.
  - You are about to drop the column `aplicacao` on the `LogsAplicacoes` table. All the data in the column will be lost.
  - You are about to drop the column `id_correlacao` on the `LogsAplicacoes` table. All the data in the column will be lost.
  - You are about to drop the column `log_mensagens` on the `LogsAplicacoes` table. All the data in the column will be lost.
  - You are about to drop the column `log_nivel` on the `LogsAplicacoes` table. All the data in the column will be lost.
  - You are about to drop the `MembrosManancial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembrosManancialQualificacoes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `application` to the `LogsAplicacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `LogsAplicacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_correlation` to the `LogsAplicacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `log_levek` to the `LogsAplicacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `log_message` to the `LogsAplicacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MembrosManancialQualificacoes" DROP CONSTRAINT "MembrosManancialQualificacoes_id_membro_fkey";

-- AlterTable
ALTER TABLE "LogsAplicacoes" DROP COLUMN "ambiente",
DROP COLUMN "aplicacao",
DROP COLUMN "id_correlacao",
DROP COLUMN "log_mensagens",
DROP COLUMN "log_nivel",
ADD COLUMN     "application" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "id_correlation" TEXT NOT NULL,
ADD COLUMN     "log_levek" TEXT NOT NULL,
ADD COLUMN     "log_message" TEXT NOT NULL;

-- DropTable
DROP TABLE "MembrosManancial";

-- DropTable
DROP TABLE "MembrosManancialQualificacoes";

-- CreateTable
CREATE TABLE "ManancialMembers" (
    "member_id" SERIAL NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "entry_membership_date" TIMESTAMP(3) NOT NULL,
    "leaving_membership_date" TIMESTAMP(3),

    CONSTRAINT "ManancialMembers_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "ManancialMembersQualification" (
    "qualification_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "member_id" INTEGER NOT NULL,

    CONSTRAINT "ManancialMembersQualification_pkey" PRIMARY KEY ("qualification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManancialMembersQualification_cpf_key" ON "ManancialMembersQualification"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "ManancialMembersQualification_rg_key" ON "ManancialMembersQualification"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "ManancialMembersQualification_email_key" ON "ManancialMembersQualification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ManancialMembersQualification_member_id_key" ON "ManancialMembersQualification"("member_id");

-- AddForeignKey
ALTER TABLE "ManancialMembersQualification" ADD CONSTRAINT "ManancialMembersQualification_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "ManancialMembers"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;
