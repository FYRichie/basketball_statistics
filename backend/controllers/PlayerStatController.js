/** @format */

const PlayerStatService = require("../services/PlayerStatService");

class PlayerStatController {
    constructor() {
        this.service = new PlayerStatService();
    }
    create = async (req, res) => {
        try {
            const instance = await this.service.create(req.body);
            console.log("Create player: ", instance);
            res.status(200).send({ message: "success", id: instance._id });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };

    get = async (req, res) => {
        const gameId = req.query["gameId"];
        const playerId = req.query["playerId"];
        let objects;
        try {
            if (playerId) {
                objects = await this.service.getByPlayerId(playerId);
            } else if (gameId) {
                objects = await this.service.getDetailedPlayerStatByGameId(
                    gameId
                );
            } else {
                objects = await this.service.getAll();
            }
            // console.log("Get players: ", objects);
            res.status(200).send({ data: objects });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };

    delete = async (req, res) => {
        const gameId = req.query["gameId"];
        const playerId = req.query["playerId"];
        try {
            if (playerId) {
                await this.service.delete(playerId);
            } else if (gameId) {
                await this.service.deleteByGameId(gameId);
            } else {
                throw Error("You must provide gameId or playerId");
            }
            console.log(
                "Delete player playerId=",
                playerId,
                ", gameId=",
                gameId
            );
            res.status(200).send({ message: "success" });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };
}

module.exports = PlayerStatController;
