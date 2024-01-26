const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Connected to socket");
  socket.on("joined", (data) => {
    io.emit("joined", data);
  });
  socket.on("sendMessage", (data) => {
    io.emit("sendMessage", data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Connect to the server ${PORT}`);
});
