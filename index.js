const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const dotenv = require("dotenv");

// Use dotenv to load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public/chat.html"));
});

const Users = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (username) => {
    console.log(`Adding user ${username} with id ${socket.id}`);
    Users[socket.id] = username;
    console.log(Users);
    io.emit("userJoined", username, Object.values(Users));
  });

  socket.on("listusers", () => {
    io.to(socket.id).emit("users", Object.values(Users));
  });

  socket.on("sendMessage", ({ name: apka, mess: message }) => {
    io.emit("receiveMessage", { name: apka, mess: message });
  });

  socket.on("disconnect", () => {
    console.log(`User with id ${socket.id} disconnected`);
    io.emit("userDisconnected", Users[socket.id], Object.values(Users));
    delete Users[socket.id];
  });
});

app.get("/users", (req, res) => {
  res.json(Object.values(Users));
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
