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
        await this.model.create(game, (err, instance) => {
            if (err) {
                throw err;
            } else {
                return instance;
            }
        });
    };

    delete = async (gameId) => {
        try {
            await this.model.deleteOne({ _d: gameId }).exec();
            await this.PlayerStatService.deleteByGameId(gameId);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = GameService;
