const mongoose = require("mongoose");
require("dotenv").config();

const PageGameInfo = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        background_image: {
            type: String,
            required: false,
        },
        magnet_link: {
            type: String,
            required: false,
        },
        short_screenshots: [{
            type: String,
            required: false,
        }],
        original_name: {
            type: String,
            required: false,
        },
        uploader_by: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
        date_time_uploaded: {
            type: String,
            required: false,
        },
        size_of_game: {
            type: String,
            required: false,
        },
        platform: {
            type: String,
            required: false,
        },
        Link_to_gamePage: {
            type: String,
            required: false,
        },
        // linkgamePlatform: {
        //     type: String,
        //     required: false,
        // },
    },
    { timestamps: true, required: true }
);
const GameInfo = mongoose.model("gameinfo", PageGameInfo);

module.exports = {
    GameInfo
};