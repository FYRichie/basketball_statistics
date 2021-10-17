/** @format */

const mongoose = require("mongoose");
const PlayerStat = require("../models/playerStat");
const assist = require("./assist");
const block = require("./block");
const turnover = require("./turnover");
const rebound = require("./rebound");
const steal = require("./steal");
const foul = require("./foul");
const point = require("./point");

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
    let gameId = req.body.gameId;
    let personalStats = await PlayerStat.find({ gameId: gameId });
    // console.log(personalStats[0]);
    let returnObject = personalStats.map((p) => {
        return {
            id: p._id,
            num: p.number,
            name: p.name,
        };
    });
    let result;
    for (let i = 0; i < personalStats.length; i++) {
        result = await assist.findAllAssistById(personalStats[i]._id);
        let assists = [0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < result.length; j++) {
            assists[result[j]["quarter"] - 1] += 1;
        }
        returnObject[i]["assist"] = assists;
        result = await block.findAllBlockById(personalStats[i]._id);
        let blocks = [0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < result.length; j++) {
            blocks[result[j]["quarter"] - 1] += 1;
        }
        returnObject[i]["block"] = blocks;
        result = await foul.findAllFoulById(personalStats[i]._id);
        let fouls = [[], [], [], [], [], [], []];
        for (let j = 0; j < result.length; j++) {
            fouls[result[j]["quarter"] - 1].push(result[j].foulType);
        }
        returnObject[i]["foul"] = fouls;
        result = await point.findAllPointById(personalStats[i]._id);
        let points = {
            threepointer: {
                made: [0, 0, 0, 0, 0, 0, 0],
                attempt: [0, 0, 0, 0, 0, 0, 0],
            },
            twopointer: {
                made: [0, 0, 0, 0, 0, 0, 0],
                attempt: [0, 0, 0, 0, 0, 0, 0],
            },
            freethrow: {
                made: [0, 0, 0, 0, 0, 0, 0],
                attempt: [0, 0, 0, 0, 0, 0, 0],
            },
        };
        for (let j = 0; j < result.length; j++) {
            element = result[j];
            points[element["pointType"]][element["made"]][
                element["quarter"] - 1
            ] += 1;
        }
        returnObject[i]["score"] = points;
        result = await rebound.findAllReboundById(personalStats[i]._id);
        let rebounds = {
            offensive: [0, 0, 0, 0, 0, 0, 0],
            deffensive: [0, 0, 0, 0, 0, 0, 0],
        };
        for (let j = 0; j < result.length; j++) {
            rebounds[result[j]["reboundType"]][result[j]["quarter"] - 1] += 1;
        }
        returnObject[i]["rebound"] = rebounds;
        result = await steal.findAllStealById(personalStats[i]._id);
        let steals = [0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < result.length; j++) {
            steals[result[j]["quarter"] - 1] += 1;
        }
        returnObject[i]["steal"] = steals;
        result = await turnover.findAllTurnoverById(personalStats[i]._id);
        let turnovers = [0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < result.length; j++) {
            turnovers[result[j]["quarter"] - 1] += 1;
        }
        returnObject[i]["turnover"] = turnovers;
    }
    res.status(200).send({ data: returnObject });
};

exports.findPlayerStat = async (req, res) => {
    let constrain = req.body.constrain;
    let personalStats = await PlayerStat.find(constrain);
    // personalStats.clone();
    res.status(200).send({ data: personalStats });
};

exports.deletePlayerStat = async (req, res) => {
    let id = req.body.id;
    assist.deleteAllAssist(id);
    block.deleteAllBlock(id);
    turnover.deleteAllTurnover(id);
    rebound.deleteAllRebound(id);
    steal.deleteAllSteal(id);
    foul.deleteAllFoul(id);
    point.deleteAllPoint(id);
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
