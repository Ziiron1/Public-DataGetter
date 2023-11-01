const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const { GameInfo } = require("../models/ModelApi");
const { GamePage } = require("../models/ModelPageGame");


dotenv.config();

const URLDATA = process.env.URLDATA;
mongoose.set('strictQuery', true);
async function connectToDB() {
    try {
        await mongoose.connect(URLDATA, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to database");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
}

connectToDB();

const getGameData = async game => {
    try {
        const response = await axios.get(
            `https://api.rawg.io/api/games/${game.id}?key=${process.env.RAWGAPI}`
        );

        const developers = response.data.developers.map(dev => dev.name) || [];
        const genres = response.data.genres.map(genre => genre.name) || [];
        const tags = response.data.tags.map(tag => tag.name) || [];
        const description_raw = response.data.description_raw;
        const platforms = response.data.platforms.map(platform => platform.platform.name) || [];
        const background_image = response.data.background_image;
        const background_image_additional = response.data.background_image_additional || "";
        const short_screenshots = game.short_screenshots.map(screenshot => screenshot) || [];
        const released = response.data.released || "";
        const website = response.data.website || "";
        const name = response.data.name || "";
        const game_id = response.data.id || "";
        const magnet_link = game.magnet_link;
        const Link_to_gamePage = game.Link_to_gamePage;
        const youtube_videoId = "";
        const youtube_description = "";
        const youtube_imageUrl = "";
        const uploader_by = "";
        const category = "";
        const date_time_uploaded = "";
        const size_of_game = "";
        const original_name = "";
        const additional_info = "";

        let minimum = "";
        let recommended = "";

        const requirements = response.data.platforms
            .filter(platform => platform.platform.name === 'PC')
            .map(platform => platform.requirements) || [];

        if (requirements.length) {
            minimum = requirements[0].minimum || "";
            recommended = requirements[0].recommended || "";
        }

        const gamePage = await GameInfo.findOne({ game_id: game.id });
        if (gamePage) {
            gamePage.short_screenshots = short_screenshots
            await gamePage.save();
        }

        return {
            developers,
            genres,
            tags,
            platforms,
            background_image,
            description_raw,
            background_image_additional,
            released,
            website,
            name,
            game_id,
            minimum,
            recommended,
            Link_to_gamePage,
            magnet_link,
            original_name,
            additional_info,
            uploader_by,
            category,
            date_time_uploaded,
            size_of_game,
            short_screenshots,
            youtube_videoId,
            youtube_description,
            youtube_imageUrl
        };
    } catch (err) {
        console.error(err);
    }
};


const saveGameData = async () => {
    const games = await GameInfo.find();
    for (const game of games) {
        try {
            const gameData = await getGameData(game);
            gameData.magnet_link = game.magnet_link;
            gameData.uploader_by = game.uploader_by;
            gameData.category = game.category;
            gameData.date_time_uploaded = game.date_time_uploaded;
            gameData.size_of_game = game.size_of_game;
            gameData.original_name = game.original_name;
            gameData.Link_to_gamePage = game.Link_to_gamePage;
            const newPageGame = new GamePage(gameData);
            await newPageGame.save();
        } catch (error) {
            console.error(`Error processing game ${game.id}:`, error);
        }
    }
};


router.get('/', async (req, res) => {
    const gamesData = await saveGameData();
    res.send(gamesData);
});

module.exports = router;
