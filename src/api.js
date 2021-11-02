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
    } = await instance.post("/game", {
        date: date,
        opponent: opponent,
    });
    return id;
};

const findAllGame = async () => {
    const {
        data: { data, message },
    } = await instance.get("/game");
    // console.log(message);
    return data.reverse();
};

const findGameById = async (id) => {
    const {
        data: { data },
    } = await instance.get(`/game?gameId=${id}`);
    // console.log(data);
    return data;
};

const deleteGame = async (id) => {
    const {
        data: { message },
    } = await instance.delete(`/game?gameId=${id}`);
    return message;
};

const createPlayerStat = async (gameId, number, name) => {
    const {
        data: { id },
    } = await instance.post("/playerstat", {
        gameId: gameId,
        number: number,
        name: name,
    });
    return id;
};

const findPlayerStatByGameId = async (gameId) => {
    const {
        data: { data },
    } = await instance.get(`/playerstat?gameId=${gameId}`);
    // console.log(data);
    return data;
};

const deletePlayerStat = async (playerId) => {
    const {
        data: { message },
    } = await instance.delete(`/playerstat?playerId=${playerId}`);
    return message;
};

const createAssist = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/assist", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });

    return id;
};

const deleteAssist = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.delete("/assist", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });
    return message;
};

const createBlock = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/block", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });

    return id;
};

const deleteBlock = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.delete("/block", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });
    return message;
};

const createFoul = async (gameId, playerId, quarter, foulType) => {
    const {
        data: { id },
    } = await instance.post("/foul", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        foulType: foulType,
    });

    return id;
};

const deleteFoul = async (gameId, playerId, quarter, foulType) => {
    const {
        data: { message },
    } = await instance.delete("/foul", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            foulType: foulType,
        },
    });
    return message;
};

const createPoint = async (gameId, playerId, quarter, pointType, made) => {
    const {
        data: { id },
    } = await instance.post("/point", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        pointType: pointType,
        made: made,
    });

    return id;
};

const deletePoint = async (gameId, playerId, quarter, pointType, made) => {
    const {
        data: { message },
    } = await instance.delete("/point", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            pointType: pointType,
            made: made,
        },
    });
    return message;
};

const createRebound = async (gameId, playerId, quarter, reboundType) => {
    const {
        data: { id },
    } = await instance.post("/rebound", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
        reboundType: reboundType,
        // 'offensive', 'defensive'
    });

    return id;
};

const deleteRebound = async (gameId, playerId, quarter, reboundType) => {
    const {
        data: { message },
    } = await instance.delete("/rebound", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
            reboundType: reboundType,
        },
        // 'offensive', 'defensive'
    });
    return message;
};

const createSteal = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/steal", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });

    return id;
};

const deleteSteal = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.delete("/steal", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });
    return message;
};

const createTurnover = async (gameId, playerId, quarter) => {
    const {
        data: { id },
    } = await instance.post("/turnover", {
        gameId: gameId,
        playerId: playerId,
        quarter: quarter,
    });

    return id;
};

const deleteTurnover = async (gameId, playerId, quarter) => {
    const {
        data: { message },
    } = await instance.delete("/turnover", {
        data: {
            gameId: gameId,
            playerId: playerId,
            quarter: quarter,
        },
    });
    return message;
};

export {
    createGame,
    findAllGame,
    findGameById,
    deleteGame,
    createPlayerStat,
    findPlayerStatByGameId,
    deletePlayerStat,
    createAssist,
    deleteAssist,
    createBlock,
    deleteBlock,
    createFoul,
    deleteFoul,
    createPoint,
    deletePoint,
    createRebound,
    deleteRebound,
    createSteal,
    deleteSteal,
    createTurnover,
    deleteTurnover,
};
