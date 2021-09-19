const path = require("path");

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const AssistanceSocket = require("./assistanceSocket");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const URL = ""; // mongoose database url

mongoose.connect(URL, {
    //need to change to process.env.MONGO_URL
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error(error);
});

db.once("open", () => {
    console.log("MongoDB connected!");

    wss.on("connection", (ws) => {
        const assistanceSocket = new AssistanceSocket(ws);
        assistanceSocket.handleMessage();

        const PORT = process.env.port || 4000;
        server.listen(PORT, () => {
            console.log(`Listening on http://localhost:${PORT}`);
        });
    });
});
