/** @format */

class Controller {
    constructor(service) {
        this.service = service;
    }
    create = async (req, res) => {
        try {
            const instance = await this.service.create(req.body);
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
                objects = await this.service.getByGameId(gameId);
            } else {
                objects = await this.service.getAll();
            }
            res.status(200).send({ data: objects });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };

    delete = async (req, res) => {
        const gameId = req.query["gameId"];
        const playerId = req.query["playerId"];
        const quarter = req.query["quarter"];
        try {
            if (playerId && quarter) {
                await this.service.deleteOne(playerId, quarter);
            } else if (playerId) {
                await this.service.deleteByPlayerId(playerId);
            } else if (gameId) {
                await this.service.deleteByGameId(gameId);
            } else {
                throw Error(
                    "You must provide gameId or playerId or (playerId and quarter)!"
                );
            }
            res.status(200).send({ message: "success" });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };
}

module.exports = Controller;
