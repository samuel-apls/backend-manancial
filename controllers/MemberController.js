import {prismaClient} from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

export default {

    async createNewMember(req, res) {
        try {
            const newMember = req.body.member;
            await prismaClient.$transaction(async (prisma) => {
                const member = await prisma.manancialMembers.create({
                    data: {
                        birth_date: newMember.birth_date,
                        entry_membership_date: newMember.entry_membership_date,
                        exit_membership_date: newMember.exit_membership_date
                    }
                })
                await prisma.manancialMembersQualification.create({
                    data: {
                        full_name: newMember.full_name,
                        occupation: newMember.occupation,
                        marital_status: newMember.marital_status,
                        cpf: newMember.cpf,
                        rg: newMember.rg,
                        address: newMember.address,
                        email: newMember.email,
                        phone_number: newMember.phone_number,
                        password: await bcrypt.hash(newMember.password, 10),
                        member_id: member.member_id
                    }
                });
            })
            return res.status(201).json({message: "Membro cadastrado com sucesso"})
        } catch (e) {
            console.log("Erro ao cadastrar novo membro ->", e)
            return res.status(500).json({message: "Erro ao salvar membro"})
        }
    }
    
}