const Game = require("../models/GameCrud");

exports.createGame = (req, res) => {
    const user = new Game({
        game_id: req.body.game_id,
        name: req.body.name,
        background_image: req.body.background_image,
        original_name: req.body.original_name,
        uploader_by: req.body.uploader_by,
        category: req.body.category,
        date_time_uploaded: req.body.date_time_uploaded,
        size_of_game: req.body.size_of_game,
        background_image_additional: req.body.background_image_additional,
        magnet_link: req.body.magnet_link,
        youtube_videoid: req.body.youtube_videoid,
        youtube_description: req.body.youtube_description,
        youtube_imageurl: req.body.youtube_imageurl,
        description_raw: req.body.description_raw,
        developers: req.body.developers,
        genres: req.body.genres,
        platforms: req.body.platforms,
        website: req.body.website,
        tags: req.body.tags,
        short_screenshots: req.body.short_screenshots,
        released: req.body.released,
        minimum: req.body.minimum,
        recommended: req.body.recommended
    });

    user
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Game created successfully",
                game: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.findAllGames = (req, res) => {
    const limit = req.query.limit; // obtém o valor de "limit" da query string

    Game.find()
        .limit(limit) // adiciona o limite à consulta, se fornecido
        .then((result) => {
            res.status(200).json({
                message: "Game list",
                Games: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.FindGameBYid = (req, res) => {
    const id = req.params.id;

    Game.findOne({ _id: id })
        .then((result) => {
            res.status(200).json({
                message: "Game found",
                game: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.updateGame = (req, res) => {
    const id = req.params.id;
    const updateOps = req.body;

    Game.update({ _id: id }, { $set: updateOps })
        .then((result) => {
            res.status(200).json({
                message: "Game updated",
                result: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
};

exports.DeleteGame = (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then((user) => res.json({ "msg": "Jogo excluído com sucesso" }))
        .catch((err) =>
            res.status(404).json({ "nouserfound": "Nenhum Jogo encontrado com esse ID" })
        );
};
