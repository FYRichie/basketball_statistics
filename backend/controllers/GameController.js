/** @format */

const GameService = require("../services/GameService");

class GameController {
    constructor() {
        this.service = new GameService();
    }
    create = async (req, res) => {
        try {
            const instance = await this.service.create(req.body);
            console.log("Create game: ", instance);
            res.status(200).send({ message: "success", id: instance._id });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };

    get = async (req, res) => {
        const gameId = req.query["gameId"];
        let objects;
        try {
            if (gameId) {
                objects = await this.service.get(gameId);
            } else {
                objects = await this.service.getAll();
            }
            console.log("Get games: ", objects);
            res.status(200).send({ data: objects, message: "success" });
        } catch (err) {
            res.status(403).send({ message: err.toString(), data: [] });
        }
    };

    delete = async (req, res) => {
        const gameId = req.query["gameId"];
        try {
            if (gameId) {
                await this.service.delete(gameId);
            } else {
                throw Error("You must provide gameId!");
            }
            console.log("Delete games: ", gameId);
            res.status(200).send({ message: "success" });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };
}

module.exports = GameController;
