/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const AssistSchema = new Schema({
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
});

// Creating a table within database with the defined schema
const Assist = mongoose.model("assist", AssistSchema);

// Exporting table for querying and mutating
module.exports = Assist;