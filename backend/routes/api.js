/** @format */

// import gameRoute from "./game";
// import assistRoute from "./assist";
// import blockRoute from "./block";
// import foulRoute from "./foul";
// import pointRoute from "./point";
// import reboundRoute from "./rebound";
// import stealRoute from "./steal";
// import turnoverRoute from "./turnover";
// import personalStatRoute from "./personalStat";
const express = require("express");
const router = express.Router();
let gameRoute = require("./game");
let assistRoute = require("./assist");
let blockRoute = require("./block");
let foulRoute = require("./foul");
let pointRoute = require("./point");
let reboundRoute = require("./rebound");
let stealRoute = require("./steal");
let turnoverRoute = require("./turnover");
let personalStatRoute = require("./personalStat");
const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

router.post("/createGame", wrap(gameRoute.createGame));
router.post("/deleteGame", wrap(gameRoute.deleteGame));
router.post("/deleteGameById", wrap(gameRoute.deleteGameById));
router.post("/findGame", wrap(gameRoute.findGame));
router.post("/findGameById", wrap(gameRoute.findGameById));
router.post("/updateGame", wrap(gameRoute.updateGame));
router.post("/createPersonalStat", wrap(personalStatRoute.createPersonalStat));
router.post("/findPersonalStat", wrap(personalStatRoute.findPersonalStat));
router.post(
    "/findPersonalStatByName",
    wrap(personalStatRoute.findPersonalStatByName)
);
router.post(
    "/findPersonalStatByGame",
    wrap(personalStatRoute.findPersonalStatByGame)
);
router.post("/updatePersonalStat", wrap(personalStatRoute.updatePersonalStat));
router.post("/deletePersonalStat", wrap(personalStatRoute.deletePersonalStat));
router.post(
    "/deletePersonalStatByGame",
    wrap(personalStatRoute.deletePersonalStatByGame)
);
router.post("/createAssist", wrap(assistRoute.createAssist));
router.post("/deleteAssist", wrap(assistRoute.deleteAssist));
router.post("/findAssist", wrap(assistRoute.findAssist));
router.post("/updateAssist", wrap(assistRoute.updateAssist));
router.post("/createBlock", wrap(blockRoute.createBlock));
router.post("/deleteBlock", wrap(blockRoute.deleteBlock));
router.post("/findBlock", wrap(blockRoute.findBlock));
router.post("/updateBlock", wrap(blockRoute.updateBlock));
router.post("/createFoul", wrap(foulRoute.createFoul));
router.post("/deleteFoul", wrap(foulRoute.deleteFoul));
router.post("/findFoul", wrap(foulRoute.findFoul));
router.post("/updateFoul", wrap(foulRoute.updateFoul));
router.post("/createPoint", wrap(pointRoute.createPoint));
router.post("/deletePoint", wrap(pointRoute.deletePoint));
router.post("/findPoint", wrap(pointRoute.findPoint));
router.post("/updatePoint", wrap(pointRoute.updatePoint));
router.post("/createRebound", wrap(reboundRoute.createRebound));
router.post("/deleteRebound", wrap(reboundRoute.deleteRebound));
router.post("/findRebound", wrap(reboundRoute.findRebound));
router.post("/updateRebound", wrap(reboundRoute.updateRebound));
router.post("/createSteal", wrap(stealRoute.createSteal));
router.post("/deleteSteal", wrap(stealRoute.deleteSteal));
router.post("/findSteal", wrap(stealRoute.findSteal));
router.post("/updateSteal", wrap(stealRoute.updateSteal));
router.post("/createTurnover", wrap(turnoverRoute.createTurnover));
router.post("/deleteTurnover", wrap(turnoverRoute.deleteTurnover));
router.post("/findTurnover", wrap(turnoverRoute.findTurnover));
router.post("/updateTurnover", wrap(turnoverRoute.updateTurnover));

module.exports = router;
