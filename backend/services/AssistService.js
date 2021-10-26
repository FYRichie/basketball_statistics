/** @format */

const Assist = require("../models/assist");
const Service = require("./Service");

class AssistService extends Service {
    constructor() {
        super(Assist);
    }
}
module.exports = AssistService;
