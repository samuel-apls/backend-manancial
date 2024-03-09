import {emailRegex, verifyCPF} from "../utils/utils.js";
import {prismaClient} from "../utils/prismaClient.js";

export default {

    async verifyNewMember(req, res, next) {
        const {
            birth_date, full_name, email, password, entry_membership_date, exit_membership_date
        } = req.body.member;

        if (!birth_date || !full_name || !email || !password || !entry_membership_date) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Senha deve ter no mínimo 6 caracteres"});
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "E-mail inválido"});
        }
        
        let memberExists = await prismaClient.manancialMembers.findFirst({
            where: {email}
        });

        if (memberExists) {
            if (memberExists.email === email) {
                return res.status(400).json({message: "E-mail já cadastrado"});
            } 
        }

        next();
    },

    async checkQualificationsMember(req, res, next) {
        const {
            occupation, role_church, marital_status, cpf, rg, address, phone_number
        } = req.body.classifications;

        if (!occupation || !marital_status ||
            !cpf || !rg || !address || !phone_number || !role_church) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        if (!verifyCPF(cpf)) {
            return res.status(400).json({message: "CPF inválido"});
        }

        let memberExists = await prismaClient.manancialMembersQualification.findFirst({
            where: {cpf}
        });

        if (memberExists) {
            if (memberExists.cpf === cpf) {
                return res.status(400).json({message: "CPF já cadastrado"});
            }
        }

        next();
    }

}