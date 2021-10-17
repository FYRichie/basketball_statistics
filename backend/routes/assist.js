/** @format */

const Assist = require("../models/assist");

exports.createAssist = async (req, res) => {
    let data = req.body.assist;
    Assist.create(data, (err, assist) => {
        if (err) {
            console.log("create assist err");
            res.status(403).send({ message: "error" });
        } else {
            console.log(assist);
            res.status(200).send({ message: "success", id: assist._id });
        }
    });
};

exports.findAssist = async (req, res) => {
    let constrain = req.body.constrain;
    let assists = await Assist.find(constrain);
    res.status(200).send({ data: assists });
};

exports.deleteAssist = async (req, res) => {
    let constrain = req.body;
    try {
        await Assist.deleteOne(constrain).exec();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.deleteAllAssist = async (id) => {
    try {
        await Assist.deleteMany({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.findAllAssistById = async (id) => {
    try {
        return await Assist.find({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.updateAssist = async (req, res) => {
    let id = req.body.id;
    let new_assist = req.body.assist;
    await Assist.updateOne({ id: id }, new_assist, function (err) {
        if (err) {
            console.log(err);
            res.status(200).send({ message: "error" });
        }
    });
    res.status(200).send({ message: "success" });
};
