/** @format */

const Controller = require("./Controller");
const AssistService = require("../services/AssistService");

// const AssistController = new Controller(AssistService);
class AssistController extends Controller {
    constructor() {
        super(new AssistService());
    }
}
module.exports = AssistController;
