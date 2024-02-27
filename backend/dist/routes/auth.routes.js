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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("hey");
    try {
        const user = yield prisma.user.findFirst({
            where: { username: username, password: password },
        });
        console.log(user);
        if (user) {
            const access_token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, "secreteKeyisVerySecret", { expiresIn: "1d" });
            if (!user.rft) {
                const refresh_token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, "secreteKeyisVeryVerryVerySecret", { expiresIn: "10d" });
                yield prisma.user.update({
                    where: { id: user.id },
                    data: { rft: refresh_token },
                });
                res.setHeader("refresh-token", refresh_token);
            }
            else {
                res.setHeader("refresh-token", user.rft);
            }
            res.setHeader("access-token", access_token);
            res.status(200).json({
                data: Object.assign({ access_token }, user),
                message: "You are logged in successfully!",
            });
        }
        else {
            res.status(404).json({ message: "Incorrect combination of credentials" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Somthing went wrong!" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: { email: req.body.email },
        });
        if (user) {
            res.status(409).json("Account is already assosietd with this email!");
        }
        const newUser = yield prisma.user.create({ data: req.body });
        res.status(200).json({
            data: newUser,
            message: "Your account is successfully registerd!",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Somthing went wrong!");
    }
}));
router.get("/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.header("uid");
    const refresh_token = req.header("refresh-token");
    if (!refresh_token || !user_id) {
        res.status(401).json({ messsage: "Please provide refresh token" });
    }
    else {
        const user = yield prisma.user.findFirst({
            where: { id: parseInt(user_id) },
        });
        if ((user === null || user === void 0 ? void 0 : user.rft) === refresh_token) {
            jsonwebtoken_1.default.verify(refresh_token, "secreteKeyisVeryVerryVerySecret", (err, data) => {
                if (err) {
                    res.status(403).json({
                        message: "You sesson is expired, You have to sign-in again!",
                    });
                }
                else {
                    const new_access_token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, "secreteKeyisVerySecret", { expiresIn: "10m" });
                    res.status(200).json({
                        data: { new_access_token },
                        message: "New access token is generated",
                    });
                }
            });
        }
    }
}));
module.exports = router;
