import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/authentication";
import { db } from "../db";

import { emitSocketEvent } from "../socket";

const router = Router();
router.use(verifyToken);

interface CustomRequest extends Request {
  user?: any;
}

//get all chats
router.get("/", async (req: CustomRequest, res: Response) => {
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
  } catch (err) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
});

//Get or create chat with userId
router.get("/:otherUserId", async (req: CustomRequest, res: Response) => {
  try {
    console.log("Request: Get or Create Chat");

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
    } else {
      const newChat = await db.chat.create({
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
        if (participant.id === req.user.id) return;
        emitSocketEvent(req, participant.id, "NewChat", newChat);
      });

      res.status(200).json(newChat);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong!" });
  }
});

module.exports = router;
