/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const FoulSchema = new Schema({
  gameId: {
    type: String,
    required: [true, "gameId field is required."],
  },
  personId: {
    type: String,
    required: [true, "personId field is required."],
  },
  quarter: {
    type: Number,
    required: [true, "quarter field is required."],
  },
  foulType: {
    type: String,
    required: [true, "foulType field is required."],
    // P, P1, P2, P3, T, C
  },
});

// Creating a table within database with the defined schema
const Foul = mongoose.model("foul", FoulSchema);

// Exporting table for querying and mutating
module.exports = Foul;
