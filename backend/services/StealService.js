/** @format */

const Steal = require("../models/steal");
const Service = require("./Service");

class StealService extends Service {
    constructor() {
        super(Steal);
    }
}
module.exports = StealService;
