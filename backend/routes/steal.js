/** @format */

const Steal = require("../models/steal");

exports.createSteal = async (req, res) => {
  let data = req.body.steal;
  Steal.create(data, (err, steal) => {
    if (err) {
      console.log("create steal err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success", id: steal._id });
    }
  });
};

exports.findSteal = async (req, res) => {
  let constrain = req.body.constrain;
  let steals = await Steal.find(constrain);
  res.status(200).send({ data: steals });
};

exports.deleteSteal = async (req, res) => {
  let id = req.body.id;
  await Steal.deleteOne({ id: id }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.updateSteal = async (req, res) => {
  let id = req.body.id;
  let new_steal = req.body.steal;
  await Steal.updateOne({ id: id }, new_steal, function (err) {
    if (err) {
      console.log(err);
      res.status(200).send({ message: "error" });
    }
  });
  res.status(200).send({ message: "success" });
};
