const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = process.env.PORT || 8999;
server.listen(port, () => console.log(`Listening on port ${port}...`));

wss.on("connection", (ws) => {
    // Handle incoming messages here
    console.log(ws)
  });