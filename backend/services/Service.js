/** @format */

class Service {
    constructor(model) {
        this.model = model;
    }
    getAll = async () => {
        return await this.model.find({});
    };

    getByGameId = async (id) => {
        return await this.model.find({ gameId: id });
    };

    getByPlayerId = async (id) => {
        return await this.model.find({ playerId: id });
    };

    create = async (object) => {
        await this.model.create(object, (err, instance) => {
            if (err) {
                throw err;
            } else {
                return instance;
            }
        });
    };

    deleteOne = async (playerId, quarter) => {
        try {
            await this.model
                .deleteOne({ playerId: playerId, quarter: quarter })
                .exec();
        } catch (err) {
            throw err;
        }
    };

    deleteByPlayerId = async (playerId) => {
        try {
            await this.model.deleteMany({ playerId: playerId }).exec();
        } catch (err) {
            throw err;
        }
    };

    deleteByGameId = async (gameId) => {
        try {
            await this.model.deleteMany({ gameId: gameId }).exec();
        } catch (err) {
            throw err;
        }
    };
}

module.exports = Service;
