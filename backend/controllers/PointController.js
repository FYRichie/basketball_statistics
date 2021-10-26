/** @format */

const Controller = require("./Controller");
const PointService = require("../services/PointService");

class PointController extends Controller {
    constructor() {
        super(new PointService());
    }
}
module.exports = PointController;
