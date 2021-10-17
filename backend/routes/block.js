/** @format */

const Block = require("../models/block");

exports.createBlock = async (req, res) => {
    let data = req.body.block;
    Block.create(data, (err, block) => {
        if (err) {
            console.log("create block err");
            res.status(403).send({ message: "error" });
        } else {
            console.log(block);
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
    try {
        await Block.deleteOne(constrain).exec();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(200).send({ message: "error" });
    }
};

exports.deleteAllBlock = async (id) => {
    try {
        await Block.deleteMany({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
};

exports.findAllBlockById = async (id) => {
    try {
        return await Block.find({ playerId: id }).exec();
    } catch (e) {
        console.log(e);
    }
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
