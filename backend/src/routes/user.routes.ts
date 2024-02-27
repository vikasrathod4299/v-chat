import { Router, Request, Response } from "express";
import { verifyToken } from "../middlewares/authentication";
import { db } from "../db";

const router = Router();
router.use(verifyToken);

interface CustomRequest extends Request {
  user?: any;
}
//Search user with username
router.get("/searchUser/:name", async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    if (name) {
      const data = await db.user.findMany({
        where: { username: { contains: name } },
      });
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Please provide username!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Somthing went wrong" });
  }
});

//Get user by chatId
router.get("/:chatId", async (req: CustomRequest, res) => {
  const { chatId } = req.params;
  try {
    const user = await db.chat.findUnique({
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
  } catch (err) {
    console.log(err);
    res.status(500).json("Somthing went wrong");
  }
});

module.exports = router;
