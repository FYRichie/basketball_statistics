/** @format */

import gameRoute from "./game";
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
}

export default main;