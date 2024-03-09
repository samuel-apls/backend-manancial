import {prismaClient} from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

export default {

    // Create a new customer member
    async createManancialMember(req, res) {
        try {
            const newMember = req.body.member;
            await prismaClient.$transaction(async (prisma) => {
                const member = await prisma.manancialMembers.create({
                    data: {
                        name: newMember.name,
                        birth_date: newMember.birth_date,
                        full_name: newMember.full_name,
                        email: newMember.email,
                        password: await bcrypt.hash(newMember.password, 10),
                        entry_membership_date: newMember.entry_membership_date,
                        exit_membership_date: newMember.exit_membership_date,
                        member_id: newMember.member_id
                    }
                })
            });
            return res.status(201).json({message: "Membro cadastrado com sucesso"})
        } catch (e) {
            console.log("Erro ao cadastrar novo membro ->", e)
            return res.status(500).json({message: "Erro ao salvar membro"})
        }
    },

    // It can only create qualification if customer is already member 
    async createMemberQualification(req, res) {
        try {
            const newClassifications = req.body.classifications;
            await prismaClient.$transaction(async (prisma) => {
                const classifications = await prisma.manancialMembersQualification.create({
                    data: {
                        occupation: newClassifications.occupation,
                        role_church: newClassifications.role_church,
                        marital_status: newClassifications.marital_status,
                        cpf: newClassifications.cpf,
                        rg: newClassifications.rg,
                        address: newClassifications.address,
                        phone_number: newClassifications.phone_number,
                        member_id: newClassifications.member_id
                    }
                })
            });

            return res.status(201).json({message: "Qualificação cadastrada com sucesso!"});

        } catch (e) {
            console.log("Erro ao cadastrar qualificações", e)
            return res.status(400).json({message: "Erro ao cadastrar qualificações"})
        }
    }
    
}