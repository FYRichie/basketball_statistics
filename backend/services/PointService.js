/** @format */

const Point = require("../models/point");
const Service = require("./Service");

class PointService extends Service {
    constructor() {
        super(Point);
    }
}
module.exports = PointService;
