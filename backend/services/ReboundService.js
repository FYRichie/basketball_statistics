/** @format */

const Rebound = require("../models/rebound");
const Service = require("./Service");

class ReboundService extends Service {
    constructor() {
        super(Rebound);
    }
}
module.exports = ReboundService;
