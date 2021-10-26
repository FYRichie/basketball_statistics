/** @format */

const Controller = require("./Controller");
const TurnoverService = require("../services/TurnoverService");

class TurnoverController extends Controller {
    constructor() {
        super(new TurnoverService());
    }
}
module.exports = TurnoverController;
