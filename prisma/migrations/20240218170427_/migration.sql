/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "MembrosManancial" (
    "id_membro" SERIAL NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "data_membresia_entrada" TIMESTAMP(3) NOT NULL,
    "data_membresia_saida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembrosManancial_pkey" PRIMARY KEY ("id_membro")
);

-- CreateTable
CREATE TABLE "MembrosManancialQualificacoes" (
    "id_qualificacao" SERIAL NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_membro" INTEGER NOT NULL,

    CONSTRAINT "MembrosManancialQualificacoes_pkey" PRIMARY KEY ("id_qualificacao")
);

-- CreateTable
CREATE TABLE "LogsAplicacoes" (
    "id_log" SERIAL NOT NULL,
    "id_correlacao" TEXT NOT NULL,
    "log_mensagens" TEXT NOT NULL,
    "log_data" TIMESTAMP(3) NOT NULL,
    "ambiente" TEXT NOT NULL,
    "aplicacao" TEXT NOT NULL,
    "log_nivel" TEXT NOT NULL,

    CONSTRAINT "LogsAplicacoes_pkey" PRIMARY KEY ("id_log")
);

-- AddForeignKey
ALTER TABLE "MembrosManancialQualificacoes" ADD CONSTRAINT "MembrosManancialQualificacoes_id_membro_fkey" FOREIGN KEY ("id_membro") REFERENCES "MembrosManancial"("id_membro") ON DELETE RESTRICT ON UPDATE CASCADE;
