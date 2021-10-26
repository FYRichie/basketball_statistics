/** @format */

const PlayerStat = require("../models/playerStat");
const AssistService = require("./AssistService");
const BlockService = require("./BlockService");
const FoulService = require("./FoulService");
const PointService = require("./PointService");
const ReboundService = require("./ReboundService");
const StealService = require("./StealService");
const TurnoverService = require("./TurnoverService");

class PlayerStatService {
    constructor() {
        this.model = PlayerStat;
    }
    getAll = async () => {
        return await this.model.find({});
    };

    getByGameId = async (id) => {
        return await this.model.find({ gameId: id });
    };

    getDetailedPlayerStatByGameId = async (id) => {
        let playerStats = await this.model.find({ gameId: id });
        let returnObject = playerStats.map((p) => {
            return {
                id: p._id,
                num: p.number,
                name: p.name,
            };
        });
        let result;
        for (let i = 0; i < playerStats.length; i++) {
            result = await AssistService.getByPlayerId(playerStats[i]._id);
            let assists = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                assists[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["assist"] = assists;
            result = await BlockService.getByPlayerId(playerStats[i]._id);
            let blocks = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                blocks[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["block"] = blocks;
            result = await FoulService.getByPlayerId(playerStats[i]._id);
            let fouls = [[], [], [], [], [], [], []];
            for (let j = 0; j < result.length; j++) {
                fouls[result[j]["quarter"] - 1].push(result[j].foulType);
            }
            returnObject[i]["foul"] = fouls;
            result = await PointService.getByPlayerId(playerStats[i]._id);
            let points = {
                threepointer: {
                    made: [0, 0, 0, 0, 0, 0, 0],
                    attempt: [0, 0, 0, 0, 0, 0, 0],
                },
                twopointer: {
                    made: [0, 0, 0, 0, 0, 0, 0],
                    attempt: [0, 0, 0, 0, 0, 0, 0],
                },
                freethrow: {
                    made: [0, 0, 0, 0, 0, 0, 0],
                    attempt: [0, 0, 0, 0, 0, 0, 0],
                },
            };
            for (let j = 0; j < result.length; j++) {
                element = result[j];
                points[element["pointType"]][element["made"]][
                    element["quarter"] - 1
                ] += 1;
            }
            returnObject[i]["score"] = points;
            result = await ReboundService.getByPlayerId(playerStats[i]._id);
            let rebounds = {
                offensive: [0, 0, 0, 0, 0, 0, 0],
                deffensive: [0, 0, 0, 0, 0, 0, 0],
            };
            for (let j = 0; j < result.length; j++) {
                rebounds[result[j]["reboundType"]][
                    result[j]["quarter"] - 1
                ] += 1;
            }
            returnObject[i]["rebound"] = rebounds;
            result = await StealService.getByPlayerId(playerStats[i]._id);
            let steals = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                steals[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["steal"] = steals;
            result = await TurnoverService.getByPlayerId(playerStats[i]._id);
            let turnovers = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                turnovers[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["turnover"] = turnovers;
        }
        return returnObject;
    };

    gePlayerStatByPlayerId = async (id) => {
        return await this.model.find({ playerId: id });
    };

    create = async (playerStat) => {
        await this.model.create(playerStat, (err, instance) => {
            if (err) {
                throw err;
            } else {
                return instance;
            }
        });
    };

    delete = async (id) => {
        try {
            await this.model.deleteOne({ _id: id }).exec();
            await AssistService.deleteByPlayerId(id);
            await BlockService.deleteByPlayerId(id);
            await FoulService.deleteByPlayerId(id);
            await PointService.deleteByPlayerId(id);
            await ReboundService.deleteByPlayerId(id);
            await StealService.deleteByPlayerId(id);
            await TurnoverService.deleteByPlayerId(id);
            return true;
        } catch (err) {
            throw err;
        }
    };

    deleteByGameId = async (gameId) => {
        try {
            await this.model.deleteMany({ gameId: gameId }).exec();
            return true;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = PlayerStatService;
