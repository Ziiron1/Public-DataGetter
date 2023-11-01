const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    game_id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    background_image: {
        type: String
    },
    original_name: {
        type: String
    },
    uploader_by: {
        type: String
    },
    category: {
        type: String
    },
    date_time_uploaded: {
        type: Date
    },
    size_of_game: {
        type: String
    },
    // background_image_additional: {
    //     type: String
    // },
    magnet_link: {
        type: String
    },
    youtube_videoid: {
        type: String
    },
    // youtube_description: {
    //     type: String
    // },
    // youtube_imageurl: {
    //     type: String
    // },
    description_raw: {
        type: String
    },
    developers: [{
        type: String
    }],
    genres: [{
        type: String
    }],
    platforms: [{
        type: String
    }],
    website: {
        type: String
    },
    tags: [{
        type: String
    }],
    short_screenshots: [{
        type: String
    }],
    released: {
        type: String
    },
    minimum: {
        type: String
    },
    recommended: {
        type: String
    }
});

module.exports = mongoose.model("GAMEPAGES", GameSchema);
