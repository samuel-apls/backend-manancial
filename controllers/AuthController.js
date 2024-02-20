import {prismaClient} from "../utils/prismaClient.js";
import {emailRegex, cpfRegex} from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    async login(req, res) { //pode logar com EMAIL ou CPF
        try {
            const {emailOrCpf, password} = req.body;
            if (!emailOrCpf || !password) return res.status(400).json({message: "Preencha todos os campos"});
            let member;
            if (emailRegex.test(emailOrCpf)) {
                member = await prismaClient.manancialMembersQualification.findUnique({where: {email: emailOrCpf}});
            } else if (cpfRegex.test(emailOrCpf)) {
                member = await prismaClient.manancialMembersQualification.findUnique({where: {cpf: emailOrCpf}});
            } else {
                return res.status(400).json({message: "Email ou CPF inválido"});
            }
            if (!member) return res.status(400).json({message: "Membro não encontrado"});
            const passwordMatch = await bcrypt.compare(password, member.password);
            if (!passwordMatch) return res.status(400).json({message: "Senha incorreta"});
            const jwToken = jwt.sign({member_id: member.member_id}, process.env.JWT_SECRET, {expiresIn: "1y"});
            res.status(200).json({message: "Login efetuado com sucesso", jwt: jwToken})
        } catch (e) {
            console.log("Erro ao efetuar login ->", e)
            res.status(500).json({message: "Erro ao efetuar login"})
        }
    }
}