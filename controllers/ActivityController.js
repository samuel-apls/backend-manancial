import { 
    createActivity,
    requestActivities
} from "../Services/CreateActivityService.js";

export default {

    // Create a new activities
    async createManancialActivity(req, res) {
        try {
            const newActivities = req.body.activities;
            await createActivity(newActivities);
            return res.status(201).json({message: "Atividades cadastradas com sucesso", activities: newActivities})
        } catch (e) {
            console.log("Erro ao cadastrar novas atividades ->", e)
            return res.status(500).json({message: "Erro ao salvar atividades"})
        }
    },

    // Request all activities
    async requestManancialActivity(req, res) {
        try {
            const activities = await requestActivities();
            if (activities) {
                return res.status(200).json({ data: activities });
            } else {
                return res.status(404).json({ message: 'Nenhuma atividade encontrada' });
            }
        } catch (e) {
            console.log("Erro ao buscar atividades ->", e)
            return res.status(500).json({message: "Erro ao buscar atividades"})
        }
    }
}