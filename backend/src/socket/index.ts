require("dotenv").config();
import { Request } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Server, Socket } from "socket.io";

interface payload extends JwtPayload {
  id: number;
  username: string;
  email: string;
}

export const initializeSocket = (io: Server) => {
  return io.on("connection", async (socket: Socket) => {
    const token = socket.handshake.auth?.access_token;
    if (!token) {
      throw new Error("Unauthorized socket connection!");
    }
    try {
      const user = (await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRETE as Secret
      )) as payload;

      socket.join(user.id.toString());
      socket.emit("connected", user.username);
      console.log("User is connected ⚡ userId:" + user.id);
      socket.on("disconnect", () => {
        console.log("User is disconnected 🚫 userId:" + user.id);
      });

      socket.on("JoinChat", (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
      });
    } catch (err) {
      console.log(err);
      throw new Error("Invalid socket connnection!");
    }
  });
};

export const emitSocketEvent = (
  req: Request,
  roomId: number,
  event: any,
  payload: any
) => {
  const io = req.app.get("io");
  if (io) {
    console.log(`Event ${event} is emited in roomID:${roomId.toString()}`);
    req.app.get("io").in(roomId.toString()).emit(event, payload);
  } else {
    console.log("No IO");
  }
};
