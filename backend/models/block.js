/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const BlockSchema = new Schema({
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
});

// Creating a table within database with the defined schema
const Block = mongoose.model("block", BlockSchema);

// Exporting table for querying and mutating
module.exports = Block;
