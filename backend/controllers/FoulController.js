/** @format */

const Controller = require("./Controller");
const FoulService = require("../services/FoulService");

class FoulController extends Controller {
    constructor() {
        super(new FoulService());
    }
}
module.exports = FoulController;
