const express = require('express');
const router = express.Router();
const UserControl = require('../controllers/UserCrud');

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

router.post('/signup', UserControl.signup);
router.post('/login', UserControl.login);


module.exports = router;