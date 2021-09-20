/** @format */

import gameRoute from "./game";
import assistRoute from "./assist";
import blockRoute from "./block";
import foulRoute from "./foul";
import pointRoute from "./point";
import reboundRoute from "./rebound";
import stealRoute from "./steal";
import turnoverRoute from "./turnover";
import personalStatRoute from "./personalStat";
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

function main(app) {
  app.post("/api/createGame", wrap(gameRoute.createGame));
  app.post("/api/deleteGame", wrap(gameRoute.deleteGame));
  app.post("/api/deleteGameById", wrap(gameRoute.deleteGameById));
  app.post("/api/findGame", wrap(gameRoute.findGame));
  app.post("/api/findGameById", wrap(gameRoute.findGameById));
  app.post("/api/updateGame", wrap(gameRoute.updateGame));
  app.post("/api/createPersonalStat", wrap(personalStatRoute.createPersonalStat));
  app.post("/api/findPersonalStat", wrap(personalStatRoute.findPersonalStat));
  app.post("/api/findPersonalStatByName", wrap(personalStatRoute.findPersonalStatByName));
  app.post("/api/findPersonalStatByGame", wrap(personalStatRoute.findPersonalStatByGame));
  app.post("/api/updatePersonalStat", wrap(personalStatRoute.updatePersonalStat));
  app.post("/api/deletePersonalStat", wrap(personalStatRoute.deletePersonalStat));
  app.post("/api/deletePersonalStatByGame", wrap(personalStatRoute.deletePersonalStatByGame));
  app.post("/api/createAssist", wrap(assistRoute.createAssist));
  app.post("/api/deleteAssist", wrap(assistRoute.deleteAssist));
  app.post("/api/findAssist", wrap(assistRoute.findAssist));
  app.post("/api/updateAssist", wrap(assistRoute.updateAssist));
  app.post("/api/createBlock", wrap(blockRoute.createBlock));
  app.post("/api/deleteBlock", wrap(blockRoute.deleteBlock));
  app.post("/api/findBlock", wrap(blockRoute.findBlock));
  app.post("/api/updateBlock", wrap(blockRoute.updateBlock));
  app.post("/api/createFoul", wrap(foulRoute.createFoul));
  app.post("/api/deleteFoul", wrap(foulRoute.deleteFoul));
  app.post("/api/findFoul", wrap(foulRoute.findFoul));
  app.post("/api/updateFoul", wrap(foulRoute.updateFoul));
  app.post("/api/createPoint", wrap(pointRoute.createPoint));
  app.post("/api/deletePoint", wrap(pointRoute.deletePoint));
  app.post("/api/findPoint", wrap(pointRoute.findPoint));
  app.post("/api/updatePoint", wrap(pointRoute.updatePoint));
  app.post("/api/createRebound", wrap(reboundRoute.createRebound));
  app.post("/api/deleteRebound", wrap(reboundRoute.deleteRebound));
  app.post("/api/findRebound", wrap(reboundRoute.findRebound));
  app.post("/api/updateRebound", wrap(reboundRoute.updateRebound));
  app.post("/api/createSteal", wrap(stealRoute.createSteal));
  app.post("/api/deleteSteal", wrap(stealRoute.deleteSteal));
  app.post("/api/findSteal", wrap(stealRoute.findSteal));
  app.post("/api/updateSteal", wrap(stealRoute.updateSteal));
  app.post("/api/createTurnover", wrap(turnoverRoute.createTurnover));
  app.post("/api/deleteTurnover", wrap(turnoverRoute.deleteTurnover));
  app.post("/api/findTurnover", wrap(turnoverRoute.findTurnover));
  app.post("/api/updateTurnover", wrap(turnoverRoute.updateTurnover));
}

export default main;