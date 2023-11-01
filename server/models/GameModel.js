const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
    {
        game_Title: {
            type: String,
            required: true,
        },
        Link_to_gamePage: {
            type: String,
            required: true,
        },
        uploader_by: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        size_of_game: {
            type: String,
            required: true,
        },
        linkgamePlatform: {
            type: String,
            required: true,
        },
        youtube_videoId: {
            type: String,
            required: false,
        },
        original_name: {
            type: String,
            required: false,
        },
        uploader_by: {
            type: String,
            required: true,
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
        // youtube_description: {
        //     type: String,
        //     required: false,
        // },
        // youtube_imageUrl: {
        //     type: String,
        //     required: false,
        // },
        date_time_uploaded: {
            type: String,
            required: true,
        },
        background_image: {
            type: String,
            required: false,
        },
        // background_image_additional: {
        //     type: String,
        //     required: false,
        // },
        description_raw: {
            type: String,
            required: false,
        },
        developers: {
            type: String,
            required: false,
        },
        magnet_link: {
            type: String,
            required: false,
        },
        genres: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        platforms: {
            type: String,
            required: false,
        },
        website: {
            type: String,
            required: false,
        },
        tags: {
            type: String,
            required: false,
        },
        released: {
            type: String,
            required: false,
        },
        id: {
            type: Number,
            required: false
        }
    },
    { timestamps: true, required: true }
);
const Game = mongoose.model("games", gameSchema);


module.exports = {
    Game
};