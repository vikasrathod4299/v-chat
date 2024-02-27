import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("hey");

  try {
    const user = await prisma.user.findFirst({
      where: { username: username, password: password },
    });
    console.log(user);
    if (user) {
      const access_token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        "secreteKeyisVerySecret",
        { expiresIn: "1d" }
      );

      if (!user.rft) {
        const refresh_token = jwt.sign(
          { id: user.id, username: user.username, email: user.email },
          "secreteKeyisVeryVerryVerySecret",
          { expiresIn: "10d" }
        );

        await prisma.user.update({
          where: { id: user.id },
          data: { rft: refresh_token },
        });
        res.setHeader("refresh-token", refresh_token);
      } else {
        res.setHeader("refresh-token", user.rft);
      }
      res.setHeader("access-token", access_token);
      res.status(200).json({
        data: { access_token, ...user },
        message: "You are logged in successfully!",
      });
    } else {
      res.status(404).json({ message: "Incorrect combination of credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong!" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (user) {
      res.status(409).json("Account is already assosietd with this email!");
    }

    const newUser = await prisma.user.create({ data: req.body });
    res.status(200).json({
      data: newUser,
      message: "Your account is successfully registerd!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Somthing went wrong!");
  }
});

router.get("/refresh", async (req: Request, res: Response) => {
  const user_id = req.header("uid");
  const refresh_token = req.header("refresh-token");

  if (!refresh_token || !user_id) {
    res.status(401).json({ messsage: "Please provide refresh token" });
  } else {
    const user = await prisma.user.findFirst({
      where: { id: parseInt(user_id) },
    });

    if (user?.rft === refresh_token) {
      jwt.verify(
        refresh_token,
        "secreteKeyisVeryVerryVerySecret",
        (err, data) => {
          if (err) {
            res.status(403).json({
              message: "You sesson is expired, You have to sign-in again!",
            });
          } else {
            const new_access_token = jwt.sign(
              { id: user.id, username: user.username, email: user.email },
              "secreteKeyisVerySecret",
              { expiresIn: "10m" }
            );
            res.status(200).json({
              data: { new_access_token },
              message: "New access token is generated",
            });
          }
        }
      );
    }
  }
});

module.exports = router;
