/** @format */

class Service {
    constructor(model) {
        this.model = model;
    }
    getAll = async () => {
        return await this.model.find({});
    };

    get = async (constrain) => {
        return await this.model.find(constrain);
    };

    create = async (object) => {
        // let instance;
        return await this.model.create(object).then((instance) => {
            return instance;
        });
    };

    deleteOne = async (constrain) => {
        try {
            await this.model.deleteOne(constrain).exec();
        } catch (err) {
            throw err;
        }
    };

    delete = async (constrain) => {
        try {
            await this.model.deleteMany(constrain).exec();
        } catch (err) {
            throw err;
        }
    };
}

module.exports = Service;
