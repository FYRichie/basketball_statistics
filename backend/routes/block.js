/** @format */

const Block = require("../models/block");

exports.createBlock = async (req, res) => {
    let data = req.body.block;
    Block.create(data, (err, block) => {
        if (err) {
            console.log("create block err");
            res.status(403).send({ message: "error" });
        } else {
            res.status(200).send({ message: "success", id: block._id });
        }
    });
};

exports.findBlock = async (req, res) => {
    let constrain = req.body.constrain;
    let blocks = await Block.find(constrain);
    res.status(200).send({ data: blocks });
};

exports.deleteBlock = async (req, res) => {
    let constrain = req.body;
    await Block.deleteOne(constrain, function (err) {
        if (err) {
            res.status(200).send({ message: "error" });
        } else {
            res.status(200).send({ message: "success" });
        }
    });
};

exports.updateBlock = async (req, res) => {
    let id = req.body.id;
    let new_block = req.body.block;
    await Block.updateOne({ id: id }, new_block, function (err) {
        if (err) {
            console.log(err);
            res.status(200).send({ message: "error" });
        }
    });
    res.status(200).send({ message: "success" });
};
