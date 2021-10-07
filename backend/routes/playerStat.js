/** @format */

const mongoose = require("mongoose");
const PlayerStat = require("../models/playerStat");

exports.createPlayerStat = async (req, res) => {
    let data = req.body.playerStat;
    PlayerStat.create(data, (err, playerStat) => {
        if (err) {
            console.log("create playerStat err");
            res.status(403).send({ message: "error" });
        } else {
            console.log(playerStat);
            res.status(200).send({ message: "success", id: playerStat._id });
        }
    });
};

exports.findPlayerStatByName = async (req, res) => {
    let name = req.body.name;
    let personalStats = await PlayerStat.find({ name: name });
    res.status(200).send({ data: personalStats });
};

exports.findPlayerStatByGame = async (req, res) => {
    let gameID = req.body.gameID;
    let personalStats = await PlayerStat.find({ gameID: gameID });
    res.status(200).send({ data: personalStats });
};

exports.findPlayerStat = async (req, res) => {
    let constrain = req.body.constrain;
    let personalStats = await PlayerStat.find(constrain);
    // personalStats.clone();
    res.status(200).send({ data: personalStats });
};

exports.deletePlayerStat = async (req, res) => {
    let id = req.body.id;
    try {
        const deletePlayerStats = await PlayerStat.deleteOne({
            _id: id,
        }).exec();
        console.log(deletePlayerStats);
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.deletePlayerStatByGame = async (req, res) => {
    let gameID = req.body.gameID;
    try {
        await PlayerStat.deleteMany({ gameID: gameID }).exec();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.updatePlayerStat = async (req, res) => {
    let id = req.body.id;
    let new_personalStat = req.body.playerStat;
    await PlayerStat.updateOne({ id: id }, new_personalStat, function (err) {
        if (err) {
            console.log(err);
            res.status(200).send({ message: "error" });
        }
    });
    res.status(200).send({ message: "success" });
};
