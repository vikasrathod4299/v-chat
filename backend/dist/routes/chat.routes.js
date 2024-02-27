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
const socket_1 = require("../socket");
const router = (0, express_1.Router)();
router.use(authentication_1.verifyToken);
//get all chats
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const chats = yield db_1.db.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: user.id,
                    },
                },
            },
            include: {
                participants: {
                    where: {
                        NOT: {
                            id: req.user.id,
                        },
                    },
                },
            },
        });
        res.status(200).json(chats);
    }
    catch (err) {
        res.status(500).json({ message: "Somthing went wrong!" });
    }
}));
//Get or create chat with userId
router.get("/:otherUserId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request: Get or Create Chat");
        const { otherUserId } = req.params;
        const { id: userId } = req.user;
        const chat = yield db_1.db.chat.findMany({
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
            include: {
                messages: true,
                participants: {
                    select: {
                        id: true,
                        first_name: true, // Include the fields you want to retrieve
                        last_name: true,
                        username: true,
                        email: true,
                        // Add more fields as needed
                    },
                },
            },
        });
        if (chat.length > 0) {
            console.log("chat Already exist");
            res.status(200).json(chat[0]);
        }
        else {
            const newChat = yield db_1.db.chat.create({
                data: {
                    participants: {
                        connect: [{ id: userId }, { id: parseInt(otherUserId) }],
                    },
                },
                include: {
                    participants: true,
                },
            });
            newChat.participants.forEach((participant) => {
                if (participant.id === req.user.id)
                    return;
                (0, socket_1.emitSocketEvent)(req, participant.id, "NewChat", newChat);
            });
            res.status(200).json(newChat);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Somthing went wrong!" });
    }
}));
module.exports = router;
