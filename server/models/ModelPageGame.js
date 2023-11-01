const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error', (error) => {
    console.log(`Error ${error}`);
});

db.once('open', () => {
    console.log("Conectado ao banco de dados do gamepages com sucesso !");
});

mongoose.connect(process.env.URLDATA, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const PageGameSchema = new mongoose.Schema(
    {
        game_id: {
            type: Number,
            required: false,
            unique: true,
        },
        name: {
            type: String,
            required: false,
        },
        background_image: {
            type: String,
            required: false,
        },
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
        // background_image_additional: {
        //     type: String,
        //     required: false,
        // },
        magnet_link: {
            type: String,
            required: false,
        },
        youtube_videoId: {
            type: String,
            required: false,
        },
        Link_to_gamePage: {
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
        description_raw: {
            type: String,
            required: false,
        },
        additional_info: {
            type: String,
            required: false,
        },
        developers: [{
            type: String,
            required: false,
        }],
        genres: [{
            type: String,
            required: false,
        }],
        // platforms: [{
        //     type: String,
        //     required: false,
        // }],
        website: {
            type: String,
            required: false,
        },
        tags: [{
            type: String,
            required: false,
        }],
        short_screenshots: [{
            type: String,
            required: false,
        }],
        released: {
            type: String,
            required: false,
        },
        minimum: {
            type: String,
            required: false,
        },
        recommended: {
            type: String,
            required: false,
        }
    },
    { timestamps: true, required: true }
);
const GamePage = mongoose.model("gamepages", PageGameSchema);

module.exports = {
    GamePage
};