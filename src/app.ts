require("dotenv").config();
import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import { verifyToken } from "./middlewares/authentication";
import { db } from "./db";
import { Server } from "socket.io";
import { initializeSocket } from "./socket";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const authRoute = require("./routes/auth");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);

initializeSocket(io);

interface CustomRequest extends Request {
  user?: any;
}

app.get(
  "/api/chats",
  verifyToken,
  async (req: CustomRequest, res: Response) => {
    const user = req.user;
    try {
      const chats = await db.chat.findMany({
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
      });

      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json({ message: "Somthing went wrong!" });
    }
  }
);

app.get(
  "/api/chat/:otherUserId",
  verifyToken,
  async (req: CustomRequest, res: Response) => {
    try {
      const { otherUserId } = req.params;
      const { id: userId } = req.user;

      const chat = await db.chat.findMany({
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
      });

      if (chat.length > 0) {
        res.status(200).json(chat[0]);
      } else {
        const newChat = await db.chat.create({
          data: {
            participants: {
              connect: [{ id: userId }, { id: parseInt(otherUserId) }],
            },
          },
        });

        res.status(200).json(newChat);
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: "Somthing went wrong!" });
    }
  }
);

app.get("/api/searchUser/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    if (name) {
      const data = await db.user.findMany({
        where: { username: { contains: name } },
      });
      res.status(200).json({ message: "Found users!", data });
    } else {
      res.status(404).json({ message: "Please provide username!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Somthing went wrong" });
  }
});

server.listen(3001, () => console.log("Listneing on port 3001"));
