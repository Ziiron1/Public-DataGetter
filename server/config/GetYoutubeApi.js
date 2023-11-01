const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const Game = mongoose.model('gamepages');


async function searchYoutube(formattedGameName) {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${formattedGameName}&type=video&key=${process.env.YOUTUBEKEY}`);
        const data = response.data;

        if (data && data.items && data.items[0]) {
            const firstVideo = data.items[0];
            const videoId = firstVideo.id.videoId;
            const description = firstVideo.snippet.description;
            const imageUrl = firstVideo.snippet.thumbnails.high.url;

            return {
                videoId,
                description,
                imageUrl,
            };
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

router.get('/video', async (req, res) => {
    const games = await Game.find({});
    let data = [];
    for (const game of games) {

        if (!game.youtube_videoId || !game.youtube_description || !game.youtube_imageUrl) {
            const formattedGameName = encodeURI(game.name).replace(/\s+/g, '+').replace(/-+/g, '+').replace(/:/g, '+') + '+game+trailer';
            const youtubeData = await searchYoutube(formattedGameName);
            if (youtubeData) {
                game.youtube_videoId = youtubeData.videoId;
                game.youtube_description = youtubeData.description;
                game.youtube_imageUrl = youtubeData.imageUrl;
                await game.save();
                data.push(youtubeData);
            }
        }
    }
    res.send(data);
});


module.exports = router;
