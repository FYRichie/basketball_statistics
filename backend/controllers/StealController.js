/** @format */

const Controller = require("./Controller");
const StealService = require("../services/StealService");

class StealController extends Controller {
    constructor() {
        super(new StealService());
    }
}
module.exports = StealController;
