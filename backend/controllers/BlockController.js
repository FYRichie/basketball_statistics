/** @format */

const Controller = require("./Controller");
const BlockService = require("../services/BlockService");

class BlockController extends Controller {
    constructor() {
        super(new BlockService());
    }
}
module.exports = BlockController;
