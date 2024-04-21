import {prismaClient} from "../utils/prismaClient.js";
import {emailRegex, generateRandomString} from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transport from "../modules/mailer.js";


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


export const forgotPasswordReqEmail = async (email) => {
    try {
        let member;
        if (emailRegex.test(email)) {
            member = await prismaClient.manancialMembers.findUnique({where: {email: email}});
        }
        if (!member) throw new Error("Email não encontrado");
        
        const token = generateRandomString();

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await prismaClient.manancialMembers.update({
            where: { member_id: member.member_id },
            data: {
              password_reset_token: token,
              password_reset_exp: now,
            },
        });
        
        transport.sendMail({
            to: email,
            from: "evan.destroyker@hotmail.com",
            template: "./auth/forgotPassword",
            context: { token },
        }, (err) => {
            if (err) throw new Error(err); 
        });

        return { token }

    } catch (error) {
        return { error: error.message };
    }
    
};

export const checkTokenPasswordService = async (email, token) => {
    try {
        let member;
        if (emailRegex.test(email)) {
            member = await prismaClient.manancialMembers.findUnique({
                where: {email: email}, 
                select: {
                    member_id: true,
                    password_reset_token: true,
                    password_reset_exp: true,
                }
            });
        }
        if (!member) return {error: "Email não passado ou inexistente"};
        
        if (token !== member.password_reset_token) return {error: "Tokens divergentes ao do banco!!"};

        const now = new Date();

        if (now > member.password_reset_exp) return {error: "Token expirado, gere outro"};
        
        const expirationTokenPasswordTime = parseInt(process.env.JWT_PASSWORD_RESET_TIME);
        const jwToken = jwt.sign({member_id: member.member_id, role: member.role, tokenRest: token}, 
            process.env.JWT_SECRET, {expiresIn: expirationTokenPasswordTime});

        return { jwToken }

    } catch(error) {
        return { error: error.message };
    }
}

export const resetPasswordService = async (email, password) => {
    try {
        let member;
        if (emailRegex.test(email)) {
            member = await prismaClient.manancialMembers.findUnique({
                where: {email: email}, 
                select: {
                    member_id: true,
                }
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await prismaClient.manancialMembers.update({
            where: {member_id: member.member_id },
            data: {
                password: hashedPassword,
            }
        });

        return { message: "Senha atualizada com sucesso!!" };

    } catch (error) {
        return { error: error.message };
    }
    
};