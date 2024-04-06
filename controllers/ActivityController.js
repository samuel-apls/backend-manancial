import { 
    createActivity
} from "../Services/CreateActivityService.js";

export default {

    // Create a new activity
    async createManancialActivity(req, res) {
        try {
            const newActivities = req.body.activities;
            await createActivity(newActivities);
            return res.status(201).json({message: "Atividades cadastradas com sucesso", activities: newActivities})
        } catch (e) {
            console.log("Erro ao cadastrar nova atividade ->", e)
            return res.status(500).json({message: "Erro ao salvar atividade"})
        }
    }
}