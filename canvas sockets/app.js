const express = require("express");
const app = express();
const server = app.listen(8080)
const io = require('socket.io')(server);

app.use("/requisite", express.static(__dirname + "/requisite"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
})

io.on('connection', (socket) => {
  socket.on('create player', msg => {
    io.emit('create player', msg);
  });
  socket.on('player move', msg => {
    io.emit('player move', msg);
  });
});