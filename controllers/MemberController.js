import {MembrosManancial, MembrosManancialQualificacoes} from "@prisma/client";

export default {
    async createMember(req, res) {
        try{

        }catch (e) {
            console.log(e)
            res.status(500).json({message: "Erro ao salvar membro"})
        }
    }
}