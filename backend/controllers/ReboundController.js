/** @format */

const Controller = require("./Controller");
const ReboundService = require("../services/ReboundService");

class ReboundController extends Controller {
    constructor() {
        super(new ReboundService());
    }
}
module.exports = ReboundController;
