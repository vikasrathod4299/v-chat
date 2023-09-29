import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/authentication";
import { db } from "../db";

const router = Router();

router.use(verifyToken);

interface CustomRequest extends Request {
  user?: any;
}

//Get all messages
router.get("/:chatId", async (req: CustomRequest, res) => {
  const { chatId } = req.params;
  try {
    const currentChat = await db.chat.findFirst({
      where: { id: parseInt(chatId) },
      include: {
        participants: true,
      },
    });
    if (!currentChat) {
      return res.status(400).json({ message: "Chat not found!" });
    }

    const chatIncludeUser = currentChat.participants.find((item) => {
      return item.id === req.user.id;
    });

    if (!chatIncludeUser) {
      return res
        .status(404)
        .json({ message: "You do not belongs to this chat!" });
    }

    const message = await db.message.findMany({
      where: { chatId: parseInt(chatId) },
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong!" });
  }
});

router.post("/send/:chatId", async (req: CustomRequest, res) => {
  const user = req.user;
  const { chatId } = req.params;
  const { content }: { content: string } = req.body;
  try {
    if (!content) {
      res.status(400).json({ message: "Message content is not provided!" });
      return;
    }
    if (!chatId) {
      res.status(400).json({ message: "Chat Id is not provided!" });
      return;
    }
    const currentChat = await db.chat.findFirst({
      where: { id: parseInt(chatId) },
    });

    if (!currentChat) {
      return res.status(400).json("Chat dose not found");
    }
    const message = await db.message.create({
      data: { content: content || "", chatId: currentChat.id, userId: user.id },
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Somthing went wrong!" });
  }
});

module.exports = router;
