/** @format */

const Block = require("../models/block");
const Service = require("./Service");

class BlockService extends Service {
    constructor() {
        super(Block);
    }
}
module.exports = BlockService;
