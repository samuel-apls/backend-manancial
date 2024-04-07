import {emailRegex, verifyCPF} from "../utils/utils.js";
import {prismaClient} from "../utils/prismaClient.js";

export default {

    async verifyNewMember(req, res, next) {
        const {
            birth_date, full_name, email, password, entry_membership_date, phone_number
        } = req.body.member;

        if (!birth_date || !full_name || !email || !password || !entry_membership_date || !phone_number) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Senha deve ter no mínimo 6 caracteres"});
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "E-mail inválido"});
        }
        
        let memberExists = await prismaClient.manancialMembers.findFirst({
            where: {
              OR: [
                { email: email },
                { phone_number: phone_number }
              ]
            }
          });

        if (memberExists) {
            if (memberExists.email === email) {
                return res.status(400).json({message: "E-mail já cadastrado"});
            }
            else {
                return res.status(400).json({message: "Telefone já cadastrado"});
            }
        }

        next();
    },

    async checkQualificationsMember(req, res, next) {
        const {
            occupation, role_church, marital_status, cpf, rg, address
        } = req.body.classifications;

        if (!occupation || !marital_status ||
            !cpf || !rg || !address || !role_church) {
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
    },

    async checkActivitiesManancial(req, res, next) {
        const activities = req.body.activities;
        
        if (!Array.isArray(activities) || activities.length === 0) {
            return res.status(400).json({ 
                message: "Atividades não passadas ou se encontram no formato incorreto!" 
            });
        }

        const errors = [];

        activities.forEach((activity, index) => {
            const { name, description, local, activity_date } = activity;
            
            if (!name || !description || !local || !activity_date) {
                errors.push(`Atividade ${index + 1} falta preencher os campos: ${[
                    !name ? "name" : "",
                    !description ? "description" : "",
                    !local ? "local" : "",
                    !activity_date ? "activity_date" : ""
                ].filter(Boolean).join(", ")}`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ message: "Erro na validação das atividades", errors });
        }
        
        next();
    }
}