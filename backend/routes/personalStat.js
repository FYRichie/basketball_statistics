/** @format */

const PersonalStat = require("../models/personalStat");

exports.createPersonalStat = async (req, res) => {
  let data = req.body.personalStat;
  console.log(data);
  PersonalStat.create(data, (err, personalStat) => {
    if (err) {
      console.log("create personalStat err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success", id: personalStat._id });
    }
  });
};

exports.findPersonalStatByName = async (req, res) => {
  let name = req.body.name;
  let personalStats = await PersonalStat.find({ name: name });
  res.status(200).send({ data: personalStats });
};

exports.findPersonalStatByGame = async (req, res) => {
  let gameID = req.body.gameID;
  let personalStats = await PersonalStat.find({ gameID: gameID });
  res.status(200).send({ data: personalStats });
};

exports.findPersonalStat = async (req, res) => {
  let constrain = req.body.constrain;
  let personalStats = await PersonalStat.find(constrain);
  res.status(200).send({ data: personalStats });
};

exports.deletePersonalStat = async (req, res) => {
  let constrain = req.body.constrain;
  await PersonalStat.deleteMany(constrain, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.deletePersonalStatByGame = async (req, res) => {
  let gameID = req.body.gameID;
  await PersonalStat.deleteMany({ gameID: gameID }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.updatePersonalStat = async (req, res) => {
  let id = req.body.id;
  let new_personalStat = req.body.personalStat;
  await PersonalStat.updateOne({ id: id }, new_personalStat, function (err) {
    if (err) {
      console.log(err);
      res.status(200).send({ message: "error" });
    }
  });
  res.status(200).send({ message: "success" });
};
