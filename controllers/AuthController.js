import { loginMember } from "../Services/LoginMemberService.js";

export default {
    async login(req, res) { //pode logar com EMAIL ou CPF
        try {
            const {emailOrCpf, password} = req.body;
            const result = await loginMember(emailOrCpf, password);
            if (result.error) {
                console.log("Erro ao efetuar login ->", result.error);
                return res.status(400).json({ message: result.error });
            }
            const { jwToken } = result;
            return res.status(200).json({ message: "Login efetuado com sucesso", jwt: result });
            
        } catch (e) {
            console.log("Erro ao efetuar login ->", e.message)
            res.status(500).json({message: "Erro ao efetuar login"})
        }
    }
}