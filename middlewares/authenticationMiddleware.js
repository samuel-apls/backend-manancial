import jwt from "jsonwebtoken";
import authDomain from "../model/authEnum.js";

export default {

    async checkAdminPermitionRole(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({error: "Token de autenticação não forncecido"});
            const token = authHeader.slice(7);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role != authDomain.administrator) return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });

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
                return res.status(500).json({ error: `${error.message}` });
            }
        }
    },

    async checkAnyPermitionsRoles(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({error: "Token de autenticação não forncecido"});
            const token = authHeader.slice(7);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role === authDomain.administrator || decoded.role === authDomain.member) { 
                next()
            }
            else {
                return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });
            }
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token de autenticação inválido.' });
            }
            else if (error.name === 'TokenExpiredError'){
                return res.status(401).json({ error: 'Token de autenticação expirado.' });
            }
            else {
                return res.status(500).json({ error: `${error.message}` });
            }
        }
    },

    async checkMidiaPermitionRole(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({error: "Token de autenticação não forncecido"});
            const token = authHeader.slice(7);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role != authDomain.midia) return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });

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
                return res.status(500).json({ error: `${error.message}` });
            }
        }
    }
}