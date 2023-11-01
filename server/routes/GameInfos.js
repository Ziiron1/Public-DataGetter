const express = require('express');
const router = express.Router();
const GameInfosController = require('../controllers/GameInfoCrud');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/gameinfo', GameInfosController.createGame);
router.get('/gameinfo', GameInfosController.findAllGames);
router.get('/gameinfo/:id', GameInfosController.FindGameBYid);
router.patch('/gameinfo/:id', GameInfosController.updateGame);
router.delete('/gameinfo/:id', GameInfosController.DeleteGame);

module.exports = router;