import jwt from "jsonwebtoken";

export default {

    async checkPermitionRoles(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.slice(7);
            if (!token) return res.status(401).json({error: "Token de autenticação não forncecido ou expirado"});
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role != 1) return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });

            next();
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token de autenticação inválido.' });
            }
            else if (error.name === 'TokenExpiredError'){
                return res.status(401).json({ error: 'Token de autenticação expirado.' });
            }
            else {
                return res.status(500).json({ error: `Token não inserido: ${error.message}` });
            }
        }
    }
}