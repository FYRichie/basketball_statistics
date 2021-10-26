/** @format */

const Foul = require("../models/foul");
const Service = require("./Service");

class FoulService extends Service {
    constructor() {
        super(Foul);
    }
}
module.exports = FoulService;
