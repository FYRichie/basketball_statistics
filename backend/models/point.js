/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const PointSchema = new Schema({
    gameId: {
        type: String,
        required: [true, "gameId field is required."],
    },
    playerId: {
        type: String,
        required: [true, "playerId field is required."],
    },
    quarter: {
        type: Number,
        required: [true, "quarter field is required."],
    },
    pointType: {
        type: String,
        required: [true, "pointType field is required."],
        // freethrow, threepoint, fieldgoal
    },
    made: {
        type: String,
        required: [true, "made field is required."],
    },
});

// Creating a table within database with the defined schema
const Point = mongoose.model("point", PointSchema);

// Exporting table for querying and mutating
module.exports = Point;
