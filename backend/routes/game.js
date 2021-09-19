/** @format */

const Game = require("../models/game");

exports.createGame = async (req, res) => {
  let data = req.body.game;
  console.log(data);
  Game.create(data, (err, game) => {
    if (err) {
      console.log("create game err");
      res.status(403).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success", id: game._id });
    }
  });
};

exports.findGame = async (req, res) => {
  let date = req.body.date;
  let opponent = req.body.opponent;
  let games = await Game.find({ date: date, opponent: opponent });
  res.status(200).send({ games: games });
};

exports.findGameById = async (req, res) => {
  let id = req.body.id;
  let games = await Game.find({ id: id });
  res.status(200).send({ games: games });
};

exports.deleteGame = async (req, res) => {
  let date = req.body.date;
  let opponent = req.body.opponent;
  await Game.deleteOne({ date: date, opponent: opponent }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.deleteGameById = async (req, res) => {
  let id = req.body.id;
  await Game.deleteOne({ id: id }, function (err) {
    if (err) {
      res.status(200).send({ message: "error" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
};

exports.updateGame = async (req, res) => {
  let id = req.body.id;
  let new_game = req.body.game;
  await Game.updateOne(
    { id: id },
    new_game,
    function (err) {
      if (err) {
        console.log(err)
        res.status(200).send({ message: "error" });
      }
    }
  );
  res.status(200).send({ message: "success" });
};