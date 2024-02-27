"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocketEvent = exports.initializeSocket = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const initializeSocket = (io) => {
    return io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!token) {
            throw new Error("Unauthorized socket connection!");
        }
        try {
            const user = (yield jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRETE));
            socket.join(user.id.toString());
            socket.emit("connected", user.username);
            console.log("User is connected ⚡ userId:" + user.id);
            socket.on("disconnect", () => {
                console.log("User is disconnected 🚫 userId:" + user.id);
            });
            socket.on("JoinChat", (chatId) => {
                console.log(`User joined the chat 🤝. chatId: `, chatId);
                socket.join(chatId);
            });
        }
        catch (err) {
            console.log(err);
            throw new Error("Invalid socket connnection!");
        }
    }));
};
exports.initializeSocket = initializeSocket;
const emitSocketEvent = (req, roomId, event, payload) => {
    const io = req.app.get("io");
    if (io) {
        console.log(`Event ${event} is emited in roomID:${roomId.toString()}`);
        req.app.get("io").in(roomId.toString()).emit(event, payload);
    }
    else {
        console.log("No IO");
    }
};
exports.emitSocketEvent = emitSocketEvent;
