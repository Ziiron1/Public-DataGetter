require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Game = mongoose.model("games");

async function scrapeMagnetLink(url) {
    try {
        let response = await axios.get(url);
        let html = response.data;
        const $ = cheerio.load(html);
        // Extraia o link magnético
        const magnetLink = $(
            ".torrentdown1.l3426749b3b895e9356348e295596e5f2634c98d8.la1038a02a9e0ee51f6e4be8730ec3edea40279a2.l0d669aa8b23687a65b2981747a14a1be1174ba2c"
        ).attr("href");

        return magnetLink;
    } catch (error) {
        console.error(error);
    }
}

router.get("/", async (req, res) => {
    try {
        await mongoose.connect(
            process.env.URLDATA,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("database conectado magnetlink.");

        const games = await Game.find({});

        for (let i = 0; i < games.length; i++) {
            let url = `https://www.1377x.to${games[i].Link_to_gamePage}`;
            let magnetLink = await scrapeMagnetLink(url);

            await Game.findOneAndUpdate(
                { _id: games[i]._id },
                { magnet_link: magnetLink }
            );
        }

        res.send("Links magnéticos adicionados com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao adicionar links magnéticos.");
    }
});

module.exports = router;
