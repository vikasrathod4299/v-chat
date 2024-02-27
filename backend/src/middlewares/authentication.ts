import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.header("authorization");
  if (access_token) {
    jwt.verify(access_token, "secreteKeyisVerySecret", (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token is invalid" });
        return;
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "You are unauthorized,(token not found)!" });
  }
};
