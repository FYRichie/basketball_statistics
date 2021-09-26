/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const StealSchema = new Schema({
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
const Steal = mongoose.model("steal", StealSchema);

// Exporting table for querying and mutating
module.exports = Steal;
