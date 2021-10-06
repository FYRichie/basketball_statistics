/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const ReboundSchema = new Schema({
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
  reboundType: {
    type: String,
    required: [true, "reboundType field is required."],
    // offensive, defensive
  },
});

// Creating a table within database with the defined schema
const Rebound = mongoose.model("Rebound", ReboundSchema);

// Exporting table for querying and mutating
module.exports = Rebound;
