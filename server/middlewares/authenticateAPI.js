const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'api.log' })
  ]
});

require("dotenv").config();

const validAPIKeys = [process.env.API_KEY1, process.env.API_KEY2];

const authenticateAPI = (req, res, next) => {
  const apiKey = req.query.key_api;

  if (!apiKey) {
    logger.info("Missing API key", { time: new Date() });
    return res.status(400).send({ error: "Missing API key" });
  }

  if (!validAPIKeys.includes(apiKey)) {
    logger.info("Unauthorized API key", { time: new Date(), key: apiKey });
    return res.status(401).send({ error: "Unauthorized" });
  }

  logger.info("Authorized API key", { time: new Date(), key: apiKey });
  next();
};

module.exports = authenticateAPI;
