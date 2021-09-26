// import express from "express";
// import cors from "cors";
// import routes from "./routes";
// import mongoose from "mongoose";

var express = require("express");
var cors = require("cors");
var routes = require("./routes");
var mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// init middleware
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || 4000;
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// TODO : connect mongodb here
console.log("start mongoose connect");
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, dboptions).catch((error) => {
  console.error(error);
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("MongoDB connected!");

  routes(app);
  app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
  });
});
