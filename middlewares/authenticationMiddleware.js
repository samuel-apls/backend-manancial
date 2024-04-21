import jwt from "jsonwebtoken";
import authDomain from "../model/authEnum.js";
import {prismaClient} from "../utils/prismaClient.js";

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
            if (decoded.role === authDomain.administrator 
                || decoded.role === authDomain.member 
                || decoded.role === authDomain.midia) { 
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
    },

    async checkTokenValidity(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({error: "Token de autenticação não forncecido"});
            const token = authHeader.slice(7);
            jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ message: "Token de autenticação válido." });
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

    async checkTokenPasswordValidity(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({error: "Token de autenticação não forncecido"});
            const token = authHeader.slice(7);
            jwt.verify(token, process.env.JWT_SECRET);
            const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET)

            let memberTokenPassword = await prismaClient.manancialMembers.findFirst({
                select: {
                    password_reset_token: true,
                },
                where: {member_id: tokenDecoded.member_id}
            });
            
            if (memberTokenPassword.password_reset_token !== tokenDecoded.tokenRest) {
                return res.status(401).json({error: "Token ou email inválido para reset de senha!!"});  
            } 
            
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