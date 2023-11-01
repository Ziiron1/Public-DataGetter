const Game = require("../models/GameCrudInfo");


exports.createGame = (req, res) => {
    const user = new Game({
        id: req.body.id,
        name: req.body.name,
        slug: req.body.slug,
        background_image: req.body.background_image,
        magnet_link: req.body.magnet_link,
        short_screenshots: req.body.short_screenshots,
        original_name: req.body.original_name,
        uploader_by: req.body.uploader_by,
        category: req.body.category,
        date_time_uploaded: req.body.date_time_uploaded,
        size_of_game: req.body.size_of_game,
        platform: req.body.platform,
        Link_to_gamePage: req.body.Link_to_gamePage,
        linkgamePlatform: req.body.linkgamePlatform
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
