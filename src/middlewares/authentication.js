"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var access_token = req.header("authorization");
    if (access_token) {
        jsonwebtoken_1.default.verify(access_token, "secreteKeyisVerySecret", function (err, user) {
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
