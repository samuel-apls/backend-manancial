import { 
    createMember,
    updateMember,
    updateMemberQualification,
    requestMember, 
    createMemberQualification, 
    requestAllValidMembers,
    requestAllInValidMembers,
    requestAllMembersWithQualidfications
} from "../Services/CreateMemberService.js";

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

    // Update a customer member
    async updateManancialMember(req, res) {
        try {
            const memberId = req.query.Id;
            const memberUpdate = req.body.member;
            const dataMember = await updateMember(parseInt(memberId), memberUpdate);
            if (!dataMember) return res.status(404).json({message: 'Membro não encontrado'});
            return res.status(201).json({message: "Membro atualizado com sucesso", data: dataMember})
        } catch (e) {
            console.log("Erro ao atualizar membro ->", e)
            return res.status(500).json({message: "Erro ao atualizar membro"})
        }
    },

    // Request a customer specific member
    async requestManancialMember(req, res) {
        try {
            const memberId = req.query.Id;
            const member = await requestMember(parseInt(memberId));
            
            if (member) {
                return res.status(200).json({ data: member });
            } else {
                return res.status(404).json({ message: 'Membro não encontrado' });
            }
        } catch (e) {
            console.log("Erro ao buscar membro ->", e)
            return res.status(500).json({message: "Erro ao buscar membro"})
        }
    },

    // Request all customers of non-valid members
    async requestNonValidMembers(req, res) {
        try {
            const member = await requestAllInValidMembers();
            
            if (member) {
                return res.status(200).json({ data: member });
            } else {
                return res.status(404).json({ message: 'Membros Não Encontrados' });
            }
        } catch (e) {
            console.log("Erro ao buscar membros ->", e)
            return res.status(500).json({message: "Erro ao buscar membros"})
        }
    },

    // Request all customers members
    async requestAllManancialMember(req, res) {
        try {
            const member = await requestAllValidMembers();
            
            if (member) {
                return res.status(200).json({ data: member });
            } else {
                return res.status(404).json({ message: 'Membros Não Encontrados' });
            }
        } catch (e) {
            console.log("Erro ao buscar membros ->", e)
            return res.status(500).json({message: "Erro ao buscar membros"})
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
    },

    // It can only update qualification if customer is already member 
    async updateMemberQualification(req, res) {
        try {
            const memberId = req.query.IdMember;
            const newClassifications = req.body.classifications;
            const updateQualification = await updateMemberQualification(parseInt(memberId), newClassifications);
            if (!updateQualification) return res.status(401).json({message: "Qualificação não encontrada!"});
            return res.status(201).json({message: "Qualificação atualizada com sucesso!", data: updateQualification});

        } catch (e) {
            console.log("Erro ao atualizar qualificações", e)
            return res.status(400).json({message: "Erro ao atualizar qualificações"})
        }
    },

    // Request member with qualification relationchip
    async requestMemberWithQualifications(req, res) {
        try {
            const memberWithQualifications = await requestAllMembersWithQualidfications();
            if (memberWithQualifications) {
                return res.status(200).json({ data: memberWithQualifications });
            } else {
                return res.status(404).json({ message: 'Empty Database' });
            }

        } catch (e) {
            console.log("Erro ao buscar membros com qualificações", e)
            return res.status(400).json({message: "Erro ao buscar dados"})
        }
    }
    
}