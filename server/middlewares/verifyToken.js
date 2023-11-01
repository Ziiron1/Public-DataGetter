const jwt = require('jsonwebtoken');

require("dotenv").config();

// Verifica se o token é válido
const verifyToken = (req, res, next) => {
    const publicRoutes = ['/login', '/signup']; // rotas públicas que não exigem autenticação
    if (publicRoutes.includes(req.originalUrl)) {
        // se a rota atual estiver na lista de rotas públicas, passa a requisição para o próximo middleware sem verificar o token
        return next();
    }

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = verifyToken;
