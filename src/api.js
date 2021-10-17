/** @format */

import axios from "axios";
require("dotenv").config();
//{ path: require("find-config")(".env") }
// console.log(process.env.REACT_APP_baseURL);
// console.log(process.env);
const baseURL = process.env.REACT_APP_baseURL || "http://localhost:4000";
const instance = axios.create({ baseURL: baseURL + "/api" });

const createGame = async (date, opponent) => {
    const {
        data: { message, id },
    } = await instance.post("/createGame", {
        game: {
            date: date,
            opponent: opponent,
        },
    });
    return id;
};

const findGame = async (constrain) => {
    const {
        data: { games },
    } = await instance.post("/findGame", { constrain: constrain });
    console.log(games);
    return games;
};

const findGameById = async (id) => {
    const {
        data: { games },
    } = await instance.post("/findGameById", { id: id });
    console.log(games);
    return games;
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

const createPlayerStat = async (gameId, number, name) => {
    const {
        data: { id },
    } = await instance.post("/createPlayerStat", {
        playerStat: {
            gameId: gameId,
            number: number,
            name: name,
        },
    });
    return id;
};

const findPlayerStat = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findPlayerStat", { constrain: constrain });
    return data;
};

const findPlayerStatByGame = async (gameId) => {
    const {
        data: { data },
    } = await instance.post("/findPlayerStatByGame", { gameId: gameId });
    return data;
};

const deletePlayerStat = async (id) => {
    const {
        data: { message },
    } = await instance.post("/deletePlayerStat", { id: id });
    return message;
};

const updatePlayerStat = async (id, myPlayerStat) => {
    const {
        data: { message },
    } = await instance.post("/updatePlayerStat", {
        id: id,
        game: myPlayerStat,
    });
    return message;
};

const createAssist = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/createAssist", {
        assist: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });

    return id;
};

const findAssist = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findAssist", { constrain: constrain });
    return data;
};

const deleteAssist = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.post("/deleteAssist", {
        gameId: gameId,
        playerId: playerId,
        quarter,
        quarter,
    });
    return message;
};

const createBlock = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/createBlock", {
        block: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });

    return id;
};

const findBlock = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findBlock", { constrain: constrain });
    return data;
};

const deleteBlock = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.post("/deleteBlock", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });
    return message;
};

const createFoul = async (gameId, playerId, quarter, foulType) => {
    const {
        data: { id },
    } = await instance.post("/createFoul", {
        foul: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            foulType: foulType,
        },
    });

    return id;
};

const findFoul = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findFoul", { constrain: constrain });
    return data;
};

const deleteFoul = async (gameId, playerId, quarter, foulType) => {
    const {
        data: { message },
    } = await instance.post("/deleteFoul", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        foulType: foulType,
    });
    return message;
};

const createPoint = async (gameId, playerId, quarter, pointType, made) => {
    const {
        data: { id },
    } = await instance.post("/createPoint", {
        point: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            pointType: pointType,
            made: made,
        },
    });

    return id;
};

const findPoint = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findPoint", { constrain: constrain });
    return data;
};

const deletePoint = async (gameId, playerId, quarter, pointType, made) => {
    const {
        data: { message },
    } = await instance.post("/deletePoint", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        pointType: pointType,
        made: made,
    });
    return message;
};

const createRebound = async (gameId, playerId, quarter, reboundType) => {
    const {
        data: { id },
    } = await instance.post("/createRebound", {
        rebound: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            reboundType: reboundType,
            // 'offensive', 'defensive'
        },
    });

    return id;
};

const findRebound = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findRebound", { constrain: constrain });
    return data;
};

const deleteRebound = async (gameId, playerId, quarter, reboundType) => {
    const {
        data: { message },
    } = await instance.post("/deleteRebound", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        reboundType: reboundType,
        // 'offensive', 'defensive'
    });
    return message;
};

const createSteal = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/createSteal", {
        steal: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });

    return id;
};

const findSteal = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findSteal", { constrain: constrain });
    return data;
};

const deleteSteal = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.post("/deleteSteal", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });
    return message;
};

const createTurnover = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/createTurnover", {
        turnover: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });

    return id;
};

const findTurnover = async (constrain) => {
    const {
        data: { data },
    } = await instance.post("/findTurnover", { constrain: constrain });
    return data;
};

const deleteTurnover = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.post("/deleteTurnover", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });
    return message;
};

export {
    createGame,
    findGame,
    findGameById,
    deleteGame,
    updateGame,
    createPlayerStat,
    findPlayerStat,
    findPlayerStatByGame,
    deletePlayerStat,
    updatePlayerStat,
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
