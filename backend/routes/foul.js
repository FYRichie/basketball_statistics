/** @format */

const Foul = require("../models/foul");

exports.createFoul = async (req, res) => {
  let data = req.body.foul;
  Foul.create(data, (err, foul) => {
    if (err) {
      console.log("create foul err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success", id: foul._id });
    }
  });
};

exports.findFoul = async (req, res) => {
  let constrain = req.body.constrain;
  let fouls = await Foul.find(constrain);
  res.status(200).send({ data: fouls });
};

exports.deleteFoul = async (req, res) => {
  let id = req.body.id;
  await Foul.deleteOne({ id: id }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.updateFoul = async (req, res) => {
  let id = req.body.id;
  let new_foul = req.body.foul;
  await Foul.updateOne(
    { id: id },
    new_foul,
    function (err) {
      if (err) {
        console.log(err)
        res.status(200).send({ message: "error" });
      }
    }
  );
  res.status(200).send({ message: "success" });
};