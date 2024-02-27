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
//Search user with username
router.get("/searchUser/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        if (name) {
            const data = yield db_1.db.user.findMany({
                where: { username: { contains: name } },
            });
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "Please provide username!" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Somthing went wrong" });
    }
}));
//Get user by chatId
router.get("/:chatId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    try {
        const user = yield db_1.db.chat.findUnique({
            where: { id: parseInt(chatId) },
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
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Somthing went wrong");
    }
}));
module.exports = router;
