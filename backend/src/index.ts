require("dotenv").config();
import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { initializeSocket } from "./socket";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.set("io", io);

const authRoute = require("./routes/auth.routes");
const chatRoute = require("./routes/chat.routes");
const userRoute = require("./routes/user.routes");
const messageRoute = require("./routes/message.routes");

app.use(cors());

app.use(express.json());

initializeSocket(io);
app.use("/api", (req, res) => {
  res.status(200).json({ message: "hello there" });
});
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(80, () => console.log("Listneing on port 3001"));
