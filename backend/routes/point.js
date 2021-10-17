/** @format */

const Point = require("../models/point");

exports.createPoint = async (req, res) => {
    let data = req.body.point;
    Point.create(data, (err, point) => {
        if (err) {
            console.log("create point err");
            res.status(403).send({ message: "error" });
        } else {
            console.log(point);
            res.status(200).send({ message: "success", id: point._id });
        }
    });
};

exports.findPoint = async (req, res) => {
    let constrain = req.body.constrain;
    let points = await Point.find(constrain);
    res.status(200).send({ data: points });
};

exports.deletePoint = async (req, res) => {
    let constrain = req.body;
    try {
        await Point.deleteOne(constrain).exec();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.findAllPointById = async (id) => {
    try {
        return await Point.find({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.deleteAllPoint = async (id) => {
    try {
        await Point.deleteMany({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.updatePoint = async (req, res) => {
    let id = req.body.id;
    let new_point = req.body.point;
    await Point.updateOne({ id: id }, new_point, function (err) {
        if (err) {
            console.log(err);
            res.status(200).send({ message: "error" });
        }
    });
    res.status(200).send({ message: "success" });
};
