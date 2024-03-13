import {prismaClient} from "../utils/prismaClient.js";
import {emailRegex, cpfRegex} from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const loginMember = async (emailOrCpf, password) => {
    try {
        if (!emailOrCpf || !password) throw new Error("Preencha todos os campos");
        let member;
        if (emailRegex.test(emailOrCpf)) {
            member = await prismaClient.manancialMembers.findUnique({where: {email: emailOrCpf}});
        } else if (cpfRegex.test(emailOrCpf)) {
            member = await prismaClient.manancialMembersQualification.findUnique({where: {cpf: emailOrCpf}});
        } else {
            throw new Error("Email ou CPF inválido");
        }
        if (!member) throw new Error("Membro não encontrado");
        const passwordMatch = await bcrypt.compare(password, member.password);

        if (!passwordMatch) throw new Error("Senha incorreta");
        
        const jwToken = jwt.sign({member_id: member.member_id}, process.env.JWT_SECRET, {expiresIn: "1y"});
        return jwToken;

    } catch (error) {
        return { error: error.message };
    }
    
};