const GameRoutes = require("./routes/GamePages");
const GameInfoRoutes = require("./routes/GameInfos");
const User = require("./routes/User");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');


const verifyToken = require("./middlewares/verifyToken")

// const authenticateAPI = require("./middlewares/authenticateAPI")

const allowlistMiddleware = require("./middlewares/AllowIp")

require("dotenv").config();
const app = express();

// Configuração do middleware CORS
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.static(__dirname + "/view"));
app.use(helmet());


mongoose.set("strictQuery", true);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.URLDATA, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database main conectado");
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
}

connectToMongoDB()

app.use(express.json());

/* Fazer Login e Pegar Token */
app.use("/", User);

// Rotas do seu aplicativo
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port} `);
});

app.use("/get1337", require("./db/coon")); /* Get first table (First) games */

app.use("/getmagnetlink", require("./db/magnetlink")); /* Get magnet link and others info and add to first table. (Second) games */

app.use("/getinfoapi", require("./jobs/ApiInfo")); /* Get info api by the name of first table and search at api. gameinfos (Third) */

app.use("/getgamedetails", require("./controllers/gameDetails")) /* Get GameDetails for gamepage (Fourth) GamePages */

app.use("/youtube", require("./config/GetYoutubeApi")); /* Get the video info, to put on gamepages, (Latest) */

// app.use("/auth", authenticate)

/* ROTAS CRUD */

app.use("/", GameRoutes); /* GamePages */

app.use("/", GameInfoRoutes); /* GameInfos */

// Tratando erros
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});
