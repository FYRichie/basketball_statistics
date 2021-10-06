/** @format */

const Point = require("../models/point");

exports.createPoint = async (req, res) => {
  let data = req.body.point;
  Point.create(data, (err, point) => {
    if (err) {
      console.log("create point err");
      res.status(403).send({ message: "error" });
    } else {
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
  let id = req.body.id;
  await Point.deleteOne({ id: id }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
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
