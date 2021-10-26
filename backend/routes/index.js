/** @format */

const express = require("express");
const router = express.Router();
const GameController = require("../controllers/GameController");
const AssistController = require("../controllers/AssistController");
const BlockController = require("../controllers/BlockController");
const FoulController = require("../controllers/FoulController");
const PointController = require("../controllers/PointController");
const ReboundController = require("../controllers/ReboundController");
const StealController = require("../controllers/StealController");
const TurnoverController = require("../controllers/TurnoverController");
const PlayerStatController = require("../controllers/PlayerStatController");
const gameController = new GameController();
const playerStatController = new PlayerStatController();
const assistController = new AssistController();
const blockController = new BlockController();
const foulController = new FoulController();
const pointController = new PointController();
const reboundController = new ReboundController();
const stealController = new StealController();
const turnoverController = new TurnoverController();

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

// console.log(typeof gameController);
// console.log(typeof gameController.get);

router.post("/game", wrap(gameController.create));
router.delete("/game", wrap(gameController.delete));
router.get("/game", wrap(gameController.get));
router.post("/playerstat", wrap(playerStatController.create));
router.delete("/playerstat", wrap(playerStatController.delete));
router.get("/playerstat", wrap(playerStatController.get));
router.post("/assist", wrap(assistController.create));
router.delete("/assist", wrap(assistController.delete));
router.get("/assist", wrap(assistController.get));
router.post("/block", wrap(blockController.create));
router.delete("/block", wrap(blockController.delete));
router.get("/block", wrap(blockController.get));
router.post("/foul", wrap(foulController.create));
router.delete("/foul", wrap(foulController.delete));
router.get("/foul", wrap(foulController.get));
router.post("/point", wrap(pointController.create));
router.delete("/point", wrap(pointController.delete));
router.get("/point", wrap(pointController.get));
router.post("/rebound", wrap(reboundController.create));
router.delete("/rebound", wrap(reboundController.delete));
router.get("/rebound", wrap(reboundController.get));
router.post("/steal", wrap(stealController.create));
router.delete("/steal", wrap(stealController.delete));
router.get("/steal", wrap(stealController.get));
router.post("/turnover", wrap(turnoverController.create));
router.delete("/turnover", wrap(turnoverController.delete));
router.get("/turnover", wrap(turnoverController.get));

module.exports = router;
