import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.status.json({ messaage: "Comment route active" });
});

router.get("/talk", verifyToken, (req, res) => {
  res.status(200).json({ message: "Comment Protected route accessed" });
});

router.post("/comment", verifyToken, async (req, res) => {
  const { post, task, user } = req.body;

  const userId = await req.id;

  const email = "Westbrook@gmail.com";

  console.log(userId);

  try {
    const posts = await prisma.comment.create({
      data: {
        post,
        task: {
          connect: {
            id: userId.user,
          },
        },
        user: {
          create: {
            id: userId.user,
            email: email,
          },
        },
      },
      select: {
        task: true,
      },
    });

    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/comments/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.comment.findUniqueOrThrow({
      where: { _id: req.params.id },
    });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/comments/:id", verifyToken, async (req, res) => {
  try {
    const post = await prisma.comment.upsert({
      where: {
        username: username,
      },
      create: {
        title,
        body,
        post,
        slug,
      },
    });
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const post = await prisma.comment.delete({
      where: {
        username: username,
      },
    });
    if (!post) {
      return res.status(404).send("Item wasn't found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
