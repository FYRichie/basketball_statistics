/** @format */

class Controller {
    constructor(service) {
        this.service = service;
    }
    create = async (req, res) => {
        try {
            const instance = await this.service.create(req.body);
            console.log("Create: ", instance);
            res.status(200).send({ message: "success", id: instance._id });
        } catch (err) {
            console.log(err);
            res.status(403).send({ message: err.toString() });
        }
    };

    get = async (req, res) => {
        let constrain = {};
        if (gameId !== undefined) {
            constrain.gameId = gameId;
        }
        const playerId = req.query["playerId"];
        if (playerId !== undefined) {
            constrain.playerId = playerId;
        }
        const quarter = req.query["quarter"];
        if (quarter !== undefined) {
            constrain.quarter = quarter;
        }
        const pointType = req.query["pointType"];
        if (pointType !== undefined) {
            constrain.pointType = pointType;
        }
        const foulType = req.query["foulType"];
        if (foulType !== undefined) {
            constrain.foulType = foulType;
        }
        const made = req.query["made"];
        if (made !== undefined) {
            constrain.made = made;
        }
        const reboundType = req.query["reboundType"];
        if (reboundType !== undefined) {
            constrain.reboundType = reboundType;
        }
        let objects;
        try {
            objects = await this.service.get(constrain);
            res.status(200).send({ data: objects });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };

    delete = async (req, res) => {
        try {
            await this.service.deleteOne(req.body);
            console.log("Delete: ", req.body);
            res.status(200).send({ message: "success" });
        } catch (err) {
            res.status(403).send({ message: err.toString() });
        }
    };
}

module.exports = Controller;
