const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const requestIp = require('request-ip');

const allowedIPs = ['']; // Lista de IPs permitidos

function allowlistMiddleware(req, res, next) {
    const allowedOrigins = ['http://localhost:5173'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.set('Access-Control-Allow-Origin', origin);
        res.set('Access-Control-Allow-Credentials', 'true');
    }

    const ip = requestIp.getClientIp(req);
    console.log(ip)

    if (ip && allowedIPs.includes(ip)) { // Verifica se o IP do cliente está na lista de IPs permitidos
        next(); // Se estiver na lista, permita que a solicitação prossiga
    } else {
        res.status(403).send('Acesso negado'); // Caso contrário, negue o acesso
    }
}

app.use(allowlistMiddleware);


module.exports = allowlistMiddleware;