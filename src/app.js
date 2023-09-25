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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var http_1 = require("http");
var express_1 = require("express");
var cors_1 = require("cors");
var authentication_1 = require("./middlewares/authentication");
var db_1 = require("./db");
var socket_io_1 = require("socket.io");
var socket_1 = require("./socket");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});
var authRoute = require("./routes/auth");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoute);
(0, socket_1.initializeSocket)(io);
app.get("/api/chats", authentication_1.verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, chats, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.db.chat.findMany({
                        where: {
                            participants: {
                                some: {
                                    id: user.id,
                                },
                            },
                        },
                        include: {
                            participants: true,
                        },
                    })];
            case 2:
                chats = _a.sent();
                res.status(200).json(chats);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(500).json({ message: "Somthing went wrong!" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/api/chat/:otherUserId", authentication_1.verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otherUserId, userId, chat, newChat, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                otherUserId = req.params.otherUserId;
                userId = req.user.id;
                return [4 /*yield*/, db_1.db.chat.findMany({
                        where: {
                            AND: [
                                {
                                    participants: {
                                        some: { id: userId },
                                    },
                                },
                                {
                                    participants: {
                                        some: { id: parseInt(otherUserId) },
                                    },
                                },
                            ],
                        },
                    })];
            case 1:
                chat = _a.sent();
                if (!(chat.length > 0)) return [3 /*break*/, 2];
                res.status(200).json(chat[0]);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_1.db.chat.create({
                    data: {
                        participants: {
                            connect: [{ id: userId }, { id: parseInt(otherUserId) }],
                        },
                    },
                })];
            case 3:
                newChat = _a.sent();
                res.status(200).json(newChat);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                res.status(500).json({ message: "Somthing went wrong!" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.get("/api/searchUser/:name", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, data, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.params.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (!name) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.db.user.findMany({
                        where: { username: { contains: name } },
                    })];
            case 2:
                data = _a.sent();
                res.status(200).json({ message: "Found users!", data: data });
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "Please provide username!" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(500).json({ message: "Somthing went wrong" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
server.listen(3001, function () { return console.log("Listneing on port 3001"); });
