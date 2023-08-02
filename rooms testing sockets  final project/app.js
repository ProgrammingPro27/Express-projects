const express = require("express");
const app = express();
const server = app.listen(8080);
const io = require('socket.io')(server);

app.use(express.json());
app.use("/requisite", express.static(__dirname + "/requisite"));

const userRoomMap = { default: [] };

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/:room", (req, res) => {
  if (!userRoomMap[req.params.room]) {
    res.redirect("/")
  } else {
    res.sendFile("room.html", { root: __dirname });
  }
});

io.on('connection', (socket) => {
  socket.on("create room", data => {
    if (!userRoomMap[data]) {
      userRoomMap[data] = []
    }
    io.emit("alert users", userRoomMap)
    console.log(userRoomMap)
  });

  socket.on('get rooms users', data => {
    io.to(data).emit("get rooms users", userRoomMap[data])
  })

  socket.on("join room", data => {
    if (userRoomMap[data]) {
      socket.join(data);
      userRoomMap[data].push(socket.id)
      console.log(userRoomMap)
    }
  });

  io.emit("alert users", userRoomMap)

});

io.of("/").adapter.on("leave-room", (room, id) => {
  if (userRoomMap[room]) {
    userRoomMap[room] = userRoomMap[room].filter(item => item !== id);
    io.to(room).emit("get rooms users", userRoomMap[room])
    console.log(userRoomMap)
  }
});