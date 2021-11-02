/** @format */

const Game = require("../models/game");
const PlayerStatService = require("./PlayerStatService");

class GameService {
    constructor() {
        this.model = Game;
        this.PlayerStatService = new PlayerStatService();
    }
    getAll = async () => {
        return await this.model.find({});
    };

    get = async (id) => {
        return await this.model.find({ _id: id });
    };

    create = async (game) => {
        return this.model.create(game).then((instance) => {
            return instance;
        });
    };

    delete = async (gameId) => {
        try {
            await this.model.deleteOne({ _id: gameId }).exec();
            await this.PlayerStatService.deleteByGameId(gameId);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = GameService;
