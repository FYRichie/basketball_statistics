/** @format */

import axios from "axios";
require("dotenv").config();
 //{ path: require("find-config")(".env") }
// console.log(process.env.REACT_APP_baseURL);
// console.log(process.env);
const baseURL = process.env.REACT_APP_baseURL || "http://localhost:4000";
const instance = axios.create({ baseURL: baseURL + "/api" });

const createGame = async (payload) => {
  const {
    data: { message, id },
  } = await instance.post("/createGame", { user: payload });

  return id;
};

const findGame = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findGame", { constrain, constrain });
  return data;
};

const deleteGame = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteGame", { id: id });
  return message;
};

const updateGame = async (id, myGame) => {
  const {
    data: { message },
  } = await instance.post("/updateGame", { id: id, game: myGame });
  return message;
};

const createPersonalStat = async (payload) => {
  const {
    data: { id },
  } = await instance.post("/createPersonalStat", { user: payload });

  return id;
};

const findPersonalStat = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findPersonalStat", { constrain, constrain });
  return data;
};

const deletePersonalStat = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deletePersonalStat", { id: id });
  return message;
};

const updatePersonalStat = async (id, myPersonalStat) => {
  const {
    data: { message },
  } = await instance.post("/updatePersonalStat", { id: id, game: myPersonalStat });
  return message;
};

const createAssist = async (gameId, personId, quarter) => {
  const {
    data: { id },
  } = await instance.post("/createAssist", { assist: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter,
    } 
  });

  return id;
};

const findAssist = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findAssist", { constrain, constrain });
  return data;
};

const deleteAssist = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteAssist", { id: id });
  return message;
};

const createBlock = async (gameId, personId, quarter) => {
  const {
    data: { id },
  } = await instance.post("/createBlock", { block: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter,
    } 
  });

  return id;
};

const findBlock = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findBlock", { constrain, constrain });
  return data;
};

const deleteBlock = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteBlock", { id: id });
  return message;
};

const createFoul = async (gameId, personId, quarter, foulType) => {
  const {
    data: { id },
  } = await instance.post("/createFoul", { foul: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter,
      foulType: foulType
    } 
  });

  return id;
};

const findFoul = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findFoul", { constrain, constrain });
  return data;
};

const deleteFoul = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteFoul", { id: id });
  return message;
};

const createPoint = async (gameId, personId, quarter, pointType, made) => {
  const {
    data: { id },
  } = await instance.post("/createPoint", { point: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter,
      pointType: pointType,
      made: made
    } 
  });

  return id;
};

const findPoint = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findPoint", { constrain, constrain });
  return data;
};

const deletePoint = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deletePoint", { id: id });
  return message;
};

const createRebound = async (gameId, personId, quarter, reboundType) => {
  const {
    data: { id },
  } = await instance.post("/createRebound", { rebound: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter,
      reboundType: reboundType
    } 
  });

  return id;
};

const findRebound = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findRebound", { constrain, constrain });
  return data;
};

const deleteRebound = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteRebound", { id: id });
  return message;
};

const createSteal = async (gameId, personId, quarter) => {
  const {
    data: { id },
  } = await instance.post("/createSteal", { steal: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter
    } 
  });

  return id;
};

const findSteal = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findSteal", { constrain, constrain });
  return data;
};

const deleteSteal = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteSteal", { id: id });
  return message;
};

const createTurnover = async (gameId, personId, quarter) => {
  const {
    data: { id },
  } = await instance.post("/createTurnover", { turnover: 
    {
      gameId: gameId,
      personId: personId,
      quarter: quarter
    } 
  });

  return id;
};

const findTurnover = async (constrain) => {
  const {
    data: { data },
  } = await instance.post("/findTurnover", { constrain, constrain });
  return data;
};

const deleteTurnover = async (id) => {
  const {
    data: { message },
  } = await instance.post("/deleteTurnover", { id: id });
  return message;
};

export {
  createGame,
  findGame,
  deleteGame,
  updateGame,
  createPersonalStat,
  findPersonalStat,
  deletePersonalStat,
  updatePersonalStat,
  createAssist,
  findAssist,
  deleteAssist,
  createBlock,
  findBlock,
  deleteBlock,
  createFoul,
  findFoul,
  deleteFoul,
  createPoint,
  findPoint,
  deletePoint,
  createRebound,
  findRebound,
  deleteRebound,
  createSteal,
  findSteal,
  deleteSteal,
  createTurnover,
  findTurnover,
  deleteTurnover,
};