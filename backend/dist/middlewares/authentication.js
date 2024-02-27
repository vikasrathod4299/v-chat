"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const access_token = req.header("authorization");
    if (access_token) {
        jsonwebtoken_1.default.verify(access_token, "secreteKeyisVerySecret", (err, user) => {
            if (err) {
                res.status(403).json({ message: "Token is invalid" });
                return;
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        res
            .status(401)
            .json({ message: "You are unauthorized,(token not found)!" });
    }
};
exports.verifyToken = verifyToken;
