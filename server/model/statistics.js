const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameStatisticsSchema = new Schema({
    id: String,
    opponent: String,
    players: Array,
    statistics: Array,
});

const GameStatistics = mongoose.model("gameStatistics", GameStatisticsSchema);
module.exports = GameStatistics;
