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
    required: [true, "quater field is required."],
  },
  pointType: {
    type: String,
    required: [true, "pointType field is required."],
    // freethrow, threepoint, fieldgoal 
  },
  made: {
    type: Boolean,
    required: [true, "made field is required."],
  }
});

// Creating a table within database with the defined schema
const Foul = mongoose.model("foul", FoulSchema);

// Exporting table for querying and mutating
module.exports = Foul;