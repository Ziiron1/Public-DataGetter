const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageGameInfo = new Schema({
        id: {
            type: Number,
        },
        name: {
            type: String,
        },
        slug: {
            type: String,
        },
        background_image: {
            type: String,
        },
        magnet_link: {
            type: String,
        },
        short_screenshots: [{
            type: String,
        }],
        original_name: {
            type: String,
        },
        uploader_by: {
            type: String,
        },
        category: {
            type: String,
        },
        date_time_uploaded: {
            type: String,
        },
        size_of_game: {
            type: String,
        },
        platform: {
            type: String,
        },
        Link_to_gamePage: {
            type: String,
        },
        // linkgamePlatform: {
        //     type: String,
        // },
    }
);

module.exports = mongoose.model("GAMEINFOS", PageGameInfo);
