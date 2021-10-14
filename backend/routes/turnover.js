/** @format */

const Turnover = require("../models/turnover");

exports.createTurnover = async (req, res) => {
    let data = req.body.turnover;
    Turnover.create(data, (err, turnover) => {
        if (err) {
            console.log("create turnover err");
            res.status(403).send({ message: "error" });
        } else {
            console.log(turnover);
            res.status(200).send({ message: "success", id: turnover._id });
        }
    });
};

exports.findTurnover = async (req, res) => {
    let constrain = req.body.constrain;
    let turnovers = await Turnover.find(constrain);
    res.status(200).send({ data: turnovers });
};

exports.deleteTurnover = async (req, res) => {
    let constrain = req.body;
    try {
        await Turnover.deleteOne(constrain).exec();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.deleteAllTurnover = async (id) => {
    try {
        await Turnover.deleteMany({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.updateTurnover = async (req, res) => {
    let id = req.body.id;
    let new_turnover = req.body.turnover;
    await Turnover.updateOne({ id: id }, new_turnover, function (err) {
        if (err) {
            console.log(err);
            res.status(200).send({ message: "error" });
        }
    });
    res.status(200).send({ message: "success" });
};
