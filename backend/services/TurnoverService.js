/** @format */

const Turnover = require("../models/turnover");
const Service = require("./Service");

class TurnoverService extends Service {
    constructor() {
        super(Turnover);
    }
}
module.exports = TurnoverService;
