/** @format */

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
function main(app) {
    app.post("/api/game", wrap(gameController.create));
    app.delete("/api/game", wrap(gameController.delete));
    app.get("/api/game", wrap(gameController.get));
    app.post("/api/playerstat", wrap(playerStatController.create));
    app.delete("/api/playerstat", wrap(playerStatController.delete));
    app.get("/api/playerstat", wrap(playerStatController.get));
    app.post("/api/assist", wrap(assistController.create));
    app.delete("/api/assist", wrap(assistController.delete));
    app.get("/api/assist", wrap(assistController.get));
    app.post("/api/block", wrap(blockController.create));
    app.delete("/api/block", wrap(blockController.delete));
    app.get("/api/block", wrap(blockController.get));
    app.post("/api/foul", wrap(foulController.create));
    app.delete("/api/foul", wrap(foulController.delete));
    app.get("/api/foul", wrap(foulController.get));
    app.post("/api/point", wrap(pointController.create));
    app.delete("/api/point", wrap(pointController.delete));
    app.get("/api/point", wrap(pointController.get));
    app.post("/api/rebound", wrap(reboundController.create));
    app.delete("/api/rebound", wrap(reboundController.delete));
    app.get("/api/rebound", wrap(reboundController.get));
    app.post("/api/steal", wrap(stealController.create));
    app.delete("/api/steal", wrap(stealController.delete));
    app.get("/api/steal", wrap(stealController.get));
    app.post("/api/turnover", wrap(turnoverController.create));
    app.delete("/api/turnover", wrap(turnoverController.delete));
    app.get("/api/turnover", wrap(turnoverController.get));
}

// export default main;
module.exports = main;
