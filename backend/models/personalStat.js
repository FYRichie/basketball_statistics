/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const PersonalStatSchema = new Schema({
  gameID: {
    type: String,
    required: [true, "GameID field is required."],
  },
  number: {
    type: String,
    required: [true, "Number field is required."],
  },
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  time: {
    type: Number,
    required: false
  },
  point: {
    type: Number,
    required: false
  },
  fieldGoalMade: {
    type: Number,
    required: false
  },
  fieldGoalAttempt: {
    type: Number,
    required: false
  },
  fieldGoalPercentage: {
    type: Number,
    required: false
  },
  threePointMade: {
    type: Number,
    required: false
  },
  threePointAttempt: {
    type: Number,
    required: false
  },
  threePointPercentage: {
    type: Number,
    required: false
  },
  freeThrowMade: {
    type: Number,
    required: false
  },
  freeThrowAttempt: {
    type: Number,
    required: false
  },
  freeThrowPercentage: {
    type: Number,
    required: false
  },
  rebound: {
    type: Number,
    required: false
  },
  assist: {
    type: Number,
    required: false
  },
  steal: {
    type: Number,
    required: false
  },
  block: {
    type: Number,
    required: false
  },
  turnover: {
    type: Number,
    required: false
  },
  personalFoul: {
    type: Number,
    required: false
  },
});

// Creating a table within database with the defined schema
const PersonalStat = mongoose.model("personalStat", PersonalStatSchema);

// Exporting table for querying and mutating
module.exports = PersonalStat;