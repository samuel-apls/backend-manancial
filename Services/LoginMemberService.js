import {prismaClient} from "../utils/prismaClient.js";
import {emailRegex} from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const loginMember = async (emailOrPhone, password) => {
    try {
        if (!emailOrPhone || !password) throw new Error("Preencha todos os campos");
        let member;
        if (emailRegex.test(emailOrPhone)) {
            member = await prismaClient.manancialMembers.findUnique({where: {email: emailOrPhone}});
        } 
        else if (emailOrPhone) {
            member = await prismaClient.manancialMembers.findUnique({where: {phone_number: emailOrPhone}});
        } else {
            throw new Error("Email ou Número de telefone inválido");
        }
        if (!member) throw new Error("Membro não encontrado");
        const passwordMatch = await bcrypt.compare(password, member.password);

        if (!passwordMatch) throw new Error("Senha incorreta");

        const expirationTime = parseInt(process.env.JWT_EXPIRATION_TIME);
        const jwToken = jwt.sign({member_id: member.member_id, role: member.role}, 
            process.env.JWT_SECRET, {expiresIn: expirationTime});
        
        let role = member.role;
        return { jwToken, role };

    } catch (error) {
        return { error: error.message };
    }
    
};