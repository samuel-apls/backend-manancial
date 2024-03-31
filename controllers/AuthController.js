import { 
    loginMember, 
    forgotPasswordReqEmail, 
    resetPasswordService } 
from "../Services/LoginMemberService.js";

export default {
    async login(req, res) { //can login with EMAIL or PhoneNumber
        try {
            const {emailOrPhone, password} = req.body;
            const result = await loginMember(emailOrPhone, password);
            if (result.error) {
                console.log("Erro ao efetuar login ->", result.error);
                return res.status(400).json({ message: result.error });
            }
            return res.status(200).json({ 
                message: "Login efetuado com sucesso", 
                jwt: result.jwToken, role: result.role });
            
        } catch (e) {
            console.log("Erro ao efetuar login ->", e.message)
            res.status(500).json({message: "Erro ao efetuar login"})
        }
    },

    async forgotPassword(req, res) { // forgot pass
        try {
            const { email } = req.body;
            const result = await forgotPasswordReqEmail(email);
            if (result.error) {
                console.log("Erro ao mandar o email ->", result.error);
                return res.status(400).json({ message: result.error });
            }
            return res.status(200).json({ 
                message: "Email enviado com sucesso!!"});
            
        } catch (e) {
            console.log("Erro no envio do email ->", e.message)
            res.status(500).json({message: "Erro no envio do email"})
        }
    },

    async resetPassword(req, res) { // reset pass
        try {
            const { email, token, password } = req.body;
            const result = await resetPasswordService(email, token, password);
            if (result.error) {
                console.log("Erro ao resetar senha ->", result.error);
                return res.status(400).json({ message: result.error });
            }
            return res.status(200).json({ 
                message: "Senha resetada com sucesso!!"});
            
        } catch (e) {
            console.log("Erro no reset de senha ->", e.message)
            res.status(500).json({message: "Erro no reset de senha"})
        }
    }
}