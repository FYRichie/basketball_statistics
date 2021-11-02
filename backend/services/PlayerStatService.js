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
        this.AssistService = new AssistService();
        this.BlockService = new BlockService();
        this.FoulService = new FoulService();
        this.PointService = new PointService();
        this.ReboundService = new ReboundService();
        this.StealService = new StealService();
        this.TurnoverService = new TurnoverService();
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
        // console.log(returnObject);
        let result;
        for (let i = 0; i < playerStats.length; i++) {
            result = await this.AssistService.get({
                playerId: playerStats[i]._id,
            });
            // console.log("result: ", result);
            let assists = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                assists[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["assist"] = assists;
            result = await this.BlockService.get({
                playerId: playerStats[i]._id,
            });
            let blocks = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                blocks[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["block"] = blocks;
            result = await this.FoulService.get({
                playerId: playerStats[i]._id,
            });
            let fouls = [[], [], [], [], [], [], []];
            for (let j = 0; j < result.length; j++) {
                fouls[result[j]["quarter"] - 1].push(result[j].foulType);
            }
            returnObject[i]["foul"] = fouls;
            result = await this.PointService.get({
                playerId: playerStats[i]._id,
            });
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
            let element;
            for (let j = 0; j < result.length; j++) {
                element = result[j];
                points[element["pointType"]][element["made"]][
                    element["quarter"] - 1
                ] += 1;
            }
            returnObject[i]["score"] = points;
            result = await this.ReboundService.get({
                playerId: playerStats[i]._id,
            });
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
            result = await this.StealService.get({
                playerId: playerStats[i]._id,
            });
            let steals = [0, 0, 0, 0, 0, 0, 0];
            for (let j = 0; j < result.length; j++) {
                steals[result[j]["quarter"] - 1] += 1;
            }
            returnObject[i]["steal"] = steals;
            result = await this.TurnoverService.get({
                playerId: playerStats[i]._id,
            });
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
        return this.model.create(playerStat).then((instance) => {
            return instance;
        });
    };

    delete = async (id) => {
        try {
            await this.model.deleteOne({ _id: id }).exec();
            await this.AssistService.delete({ playerId: id });
            await this.BlockService.delete({ playerId: id });
            await this.FoulService.delete({ playerId: id });
            await this.PointService.delete({ playerId: id });
            await this.ReboundService.delete({ playerId: id });
            await this.StealService.delete({ playerId: id });
            await this.TurnoverService.delete({ playerId: id });
        } catch (err) {
            throw err;
        }
    };

    deleteByGameId = async (gameId) => {
        try {
            let players = this.model.find({ gameId: gameId });
            players.forEach((player) => {
                this.delete(player._id);
            });
        } catch (err) {
            throw err;
        }
    };
}

module.exports = PlayerStatService;
