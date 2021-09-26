/** @format */

const Rebound = require("../models/rebound");

exports.createRebound = async (req, res) => {
  let data = req.body.rebound;
  Rebound.create(data, (err, rebound) => {
    if (err) {
      console.log("create rebound err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success", id: rebound._id });
    }
  });
};

exports.findRebound = async (req, res) => {
  let constrain = req.body.constrain;
  let rebounds = await Rebound.find(constrain);
  res.status(200).send({ data: rebounds });
};

exports.deleteRebound = async (req, res) => {
  let id = req.body.id;
  await Rebound.deleteOne({ id: id }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.updateRebound = async (req, res) => {
  let id = req.body.id;
  let new_rebound = req.body.rebound;
  await Rebound.updateOne({ id: id }, new_rebound, function (err) {
    if (err) {
      console.log(err);
      res.status(200).send({ message: "error" });
    }
  });
  res.status(200).send({ message: "success" });
};
