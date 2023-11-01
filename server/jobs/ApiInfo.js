const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = mongoose.model("games");
const axios = require('axios');
const { GameInfo } = require("../models/ModelApi");

require("dotenv").config();

const URLDATA = process.env.URLDATA;

mongoose.connect(URLDATA, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("ApiInfo Connected to database");
}).catch((error) => {
    console.log("Error connecting to database: ", error);
});

async function formatGameTitle(title) {
    const keywordsToRemove = ["DLC", "REPACK", "FITGIRL", "MULTI", "DELUXE EDITION", "FOUNDER'S BUNDLE", "BUNDLE", "RELEASE", "BONUS CONTENT", "SELECTIVE DOWNLOAD", "DODI ", "FTP", "3000", "XBOX", "PS3", "BUILD", "FIX", "EMPRESS", "FLT", "FROM", "LANGUAGES", "EDITION", "CRASHFIX", "CODEX", "MULTI23", "⭐", "[V.1.2]", "GOG", "ALL DLCS", "BONUSES", "MULTI14", "V1.5_3.330", "BUNDLE", "V1.0.2", "FROM 1 GB", "GB", "DOWNLOAD", "MULTI13", "MULTI4", "UPDATE", "KAOS", "V1.0.9", "V1.4", "V1.3", "(XBOX 360)", "XBOX360", "COMPLEX", "XBOX360-XPG", "XBLA XBOX360-XBLAPLUS", "(SILVERTORRENT)", "[JTAG-RGH]-ENJOY-iT", "XBOX360-SPARE", "(Build 10181864 + All DLCs, MULTi11)", "(v20211029 + WINDOWS 7-11 COMPATIBLE + GENTOOL + FONT FIX + BALANCE PATCH V1.06 + MULTIPLAYER + ENGLISH/GERMAN)", "[DODI REPACK]", "(v20230124 - HORDE MODE XL + All DLCs + MULTI11)", "DOWNPOUR DLC", "(ENG/RUS)", "10232303", "SWITCH", "(v3.12 + 5 DLCS, MULTI12)", "FITGIRL REPACK", "(V1.0.2802/1.64 ONLINE, MULTI13) [FITGIRL REPACK]", "SOUNDTRACKS", "V0.22.0F", "V1.1.0", "V88616", "V0.5.616", "V2.1", "ENDGAME", "SUPPORTER", "PACK", "(V1.1.0 + WAVE 1 DLC + RYUJINX/YUZU SWITCH EMULATORS, MULTI9)", "V2797", "V3.140.0", "(GOG)", "(V88616 + 29 DLCS, MULTI6)", "MULTI10", "MULTI15", "V1.0.0.5", "(", ")", "[", "]", "{", "}", "VERSION", "V0.4.20230124.110931,", "DINOBYTES", "V1.0.18", "V1.011", "V0.17.2", "-CODEX (2022) [v.1.2] ⭐ RePack ⭐", "(v1.2#210, MULTi16) [FitGirl Repack, Selective Download - from 4 GB]", "(DEV Debug Build/Nov 2022, ENG/RUS)", "Pre-order", "Steam"];

    const versionRegex = /v\d+(\.\d+)+/;
    title = title.replace(versionRegex, "");
    const words = title.toUpperCase().split(" ");


    const formattedWords = words.filter(word => !keywordsToRemove.includes(word));
    return formattedWords.join("%20").trim();

}

async function searchAndSaveGame(gameTitle) {
    try {
        const formattedTitle = await formatGameTitle(gameTitle);
        const response = await axios.get(`https://api.rawg.io/api/games?search=${formattedTitle}&key=${process.env.RAWGAPI}`);
        const gameData = response.data.results[0];
        if (gameData) {
            return {
                id: gameData.id,
                name: gameData.name,
                slug: gameData.slug,
                background_image: gameData.background_image,
                short_screenshots: gameData.short_screenshots.map(screenshot => screenshot.image) || [],
            };
        }
        return null;
    } catch (error) {
        console.log(`Error getting game data for ${gameTitle}: `, error);
        return null;
    }
}

async function storeGameData(game, gameData) {
    try {
        const gamePage = new GameInfo({
            id: gameData.id,
            name: gameData.name,
            slug: gameData.slug,
            background_image: gameData.background_image,
            short_screenshots: gameData.short_screenshots,
            magnet_link: gameData.magnet_link,
            original_name: game.game_Title,
            uploader_by: game.uploader_by,
            category: game.category,
            date_time_uploaded: game.date_time_uploaded,
            size_of_game: game.size_of_game,
            platform: game.platform,
            Link_to_gamePage: game.Link_to_gamePage,
            linkgamePlatform: game.linkgamePlatform,
        });
        await gamePage.save();
    } catch (error) {
        console.log(`Error saving game data for ${gameData.name}: `, error);
    }
}

router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        const gamesWithData = await Promise.all(games.map(async game => {
            const gameData = await searchAndSaveGame(game.game_Title);
            if (gameData) {
                gameData.magnet_link = game.magnet_link;
                await storeGameData(game, gameData);
            }
            return gameData;
        }));
        res.json(gamesWithData);
    } catch (error) {
        console.log("Error finding games: ", error);
        res.sendStatus(500);
    }
});


module.exports = router;
