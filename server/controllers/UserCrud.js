const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema"); // Supondo que você tenha criado um modelo de usuário

require("dotenv").config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 15).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "Usuário criado!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
};

exports.login = (req, res, next) => {
    const errorMessages = {
        emailNotFound: "Email não encontrado!",
        incorrectPassword: "Senha errada!",
        unauthorizedToken: "Erro no sistema de conta!",
    };

    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (!regex.test(req.body.email)) {
        return res.status(401).json({
            message: errorMessages.emailNotFound,
        });
    }

    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: errorMessages.emailNotFound,
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: errorMessages.incorrectPassword,
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser.id },
                process.env.SECRET,
                { expiresIn: "3m" },
            );
            res.status(200).json({
                token: token,
                expiresIn: 180,
                userId: fetchedUser.id,
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: errorMessages.unauthorizedToken,
            });
        });
};
