const express = require('express');
const router = express.Router();
const userController = require('../controllers/GamePageCrud');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/game', userController.createGame);
router.get('/game', userController.findAllGames);
router.get('/game/:id', userController.FindGameBYid);
router.patch('/game/:id', userController.updateGame);
router.delete('/game/:id', userController.DeleteGame);

module.exports = router;