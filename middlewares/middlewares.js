import {emailRegex, verifyCPF} from "../utils/utils.js";
import {prismaClient} from "../utils/prismaClient.js";

export default {

    async verifyNewMember(req, res, next) {
        const {
            birth_date, entry_membership_date, exit_membership_date
        } = req.body.member;

        if (!birth_date || !entry_membership_date) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        next();
    },

    async checkQualificationsMember(req, res, next) {
        const {
            full_name, occupation, marital_status, cpf, rg, address, email, phone_number,
            password
        } = req.body.classifications;

        if (!full_name || !occupation || !marital_status ||
            !cpf || !rg || !address || !email || !phone_number ||
            !password) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Senha deve ter no mínimo 6 caracteres"});
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "E-mail inválido"});
        }

        if (!verifyCPF(cpf)) {
            return res.status(400).json({message: "CPF inválido"});
        }

        let memberExists = await prismaClient.manancialMembersQualification.findFirst({
            where: {OR: [{email}, {cpf}]}
        });

        if (memberExists) {
            if (memberExists.email === email) {
                return res.status(400).json({message: "E-mail já cadastrado"});
            } else {
                return res.status(400).json({message: "CPF já cadastrado"});
            }
        }

        next();
    }

}