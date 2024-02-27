"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, socket_1.initializeSocket)(io);
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
server.listen(3001, () => console.log("Listneing on port 3001"));
