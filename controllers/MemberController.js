import { createMember, createMemberQualification } from "../Services/CreateMemberService.js";

export default {

    // Create a new customer member
    async createManancialMember(req, res) {
        try {
            const newMember = req.body.member;
            await createMember(newMember);
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
            await createMemberQualification(newClassifications);
            return res.status(201).json({message: "Qualificação cadastrada com sucesso!"});

        } catch (e) {
            console.log("Erro ao cadastrar qualificações", e)
            return res.status(400).json({message: "Erro ao cadastrar qualificações"})
        }
    }
    
}