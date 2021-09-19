/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const GameSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Date field is required."],
  },
  opponent: {
    type: String,
    required: [true, "Opponent field is required."],
  },
  ourScore: {
    type: Number,
    required: false
  },
  opponentScore: {
    type: Number,
    required: false
  },
  win: {
    type: Boolean,
    required: false
  }
});

// Creating a table within database with the defined schema
const Game = mongoose.model("game", GameSchema);

// Exporting table for querying and mutating
module.exports = Game;