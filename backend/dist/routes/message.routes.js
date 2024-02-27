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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.use(authentication_1.verifyToken);
//Get all messages
router.get("/:chatId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    try {
        const currentChat = yield db_1.db.chat.findFirst({
            where: { id: parseInt(chatId) },
            include: {
                participants: true,
            },
        });
        if (!currentChat) {
            return res.status(400).json({ message: "Chat not found!" });
        }
        const chatIncludeUser = currentChat.participants.find((item) => {
            return item.id === req.user.id;
        });
        if (!chatIncludeUser) {
            return res
                .status(404)
                .json({ message: "You do not belongs to this chat!" });
        }
        const message = yield db_1.db.message.findMany({
            where: { chatId: parseInt(chatId) },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Somthing went wrong!" });
    }
}));
router.post("/send/:chatId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { chatId } = req.params;
    const { content } = req.body;
    try {
        if (!content) {
            res.status(400).json({ message: "Message content is not provided!" });
            return;
        }
        if (!chatId) {
            res.status(400).json({ message: "Chat Id is not provided!" });
            return;
        }
        const currentChat = yield db_1.db.chat.findFirst({
            where: { id: parseInt(chatId) },
        });
        if (!currentChat) {
            return res.status(400).json("Chat dose not found");
        }
        const message = yield db_1.db.message.create({
            data: { content: content || "", chatId: currentChat.id, userId: user.id },
        });
        console.log();
        req.app.get("io").in(chatId).emit("MessageReceived", message);
        res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Somthing went wrong!" });
    }
}));
module.exports = router;
