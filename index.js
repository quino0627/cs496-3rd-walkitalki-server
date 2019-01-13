// const - cannot change
// let - can change
// arrow function
// formatting

// LOAD PACKAGES

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// CONFIGURE APP TO USE BODYPARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({ limit: "50mb" }));
app.use(bodyParser.json());
app.use("/storage", express.static("storage/"));

// CONFIGURE SERVER PORT
const port = process.env.port || 80;

// DEFINE MODEL

const User = require("./models/User");
const MapChat = require("./models/mapChat");

// CONFIGURE ROUTER

//  USERROUTER: manage users such as register
const userRouter = require("./routes/userRouter")(app, User);
const mapChatRouter = require("./routes/mapChatRouter")(app, MapChat);
//SOCKET
//IMPLEMENT

// RUN SERVER
const server = app.listen(port, () => {
  console.log(`EXPRESS SERVER is running on ${port}`);
});

//CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("MONGODB CONNECTED SUCCESSFULY");
});

mongoose.connect(
  "mongodb://localhost:27017/local",
  { useNewUrlParser: true }
);

const io = require("socket.io").listen(server).sockets;
let numUsers = 0;
io.on("connection", socket => {
  console.log("connection client");

  socket.on("detection", (name, content) => {
    console.log(`new message content : ${name}, ${content}`);
    socket.emit("new message", {
      username: name,
      message: content
    });
    socket.broadcast.emit("new message", {
      username: name,
      message: content
    });
  });

  socket.on("map detection", (name, content, latitude, longitude) => {
    console.log(
      `new message content : ${name}, ${content} ,${longitude}, ${latitude}`
    );
    socket.emit("map new message", {
      username: name,
      message: content,
      longitude: longitude,
      latitude: latitude
    });
    socket.broadcast.emit("map new message", {
      username: name,
      message: content,
      longitude: longitude,
      latitude: latitude
    });
  });

  //   socket.on("message", data => {
  //     console.log(`socket : message : ${data}`);
  //   });
});
