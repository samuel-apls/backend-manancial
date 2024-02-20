import {verifyNewMember} from "../utils/utils.js";
import {prismaClient} from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

export default {
    async createMember(req, res) {
        const newMember = req.body.member;
        const validMember = verifyNewMember(newMember);
        if (validMember !== true) return res.status(400).json({message: validMember});
        const memberExists = await prismaClient.membrosManancialQualificacoes.findUnique({where: {email: newMember.email}});
        if (memberExists) return res.status(400).json({message: "Membro já cadastrado"});

        try {
            await prismaClient.$transaction(async (prisma) => {
                const member = await prisma.membrosManancial.create({
                    data: {
                        data_nascimento: newMember.data_nascimento,
                        data_membresia_entrada: newMember.data_membresia_entrada,
                        data_membresia_saida: newMember.data_membresia_saida,
                    }
                })
                await prisma.membrosManancialQualificacoes.create({
                    data: {
                        nome_completo: newMember.nome_completo,
                        profissao: newMember.profissao,
                        estado_civil: newMember.estado_civil,
                        cpf: newMember.cpf,
                        rg: newMember.rg,
                        endereco: newMember.endereco,
                        email: newMember.email,
                        celular: newMember.celular,
                        senha: await bcrypt.hash(newMember.senha, 12),
                        id_membro: member.id_membro
                    }
                });
            })
            res.status(201).json({message: "Membro cadastrado com sucesso"})
        } catch (e) {
            console.log("Erro ao cadastrar novo membro ->", e)
            res.status(500).json({message: "Erro ao salvar membro"})
        }
    }
}