import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

router.post("/tasks", verifyToken, async (req, res) => {
  const { title, body, author } = req.body;

  const userId = await req.id;

  console.log(req.id);

  try {
    const task = await prisma.task.create({
      data: {
        title,
        body,
        author: {
          connect: {
            id: userId.user,
          },
        },
      },
      select: {
        author: true,
      },
    });

    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
    });
    console.log(task);
    res.send(task);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/tasks/:id", verifyToken, async (req, res) => {
  try {
    const task = await prisma.task.upsert({
      where: {
        where: { id: req.params.id },
      },
      create: {
        title,
        body,
        comments,
      },
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: {
        username: username,
      },
    });
    if (!task) {
      return res.status(404).send("Item wasn't found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
