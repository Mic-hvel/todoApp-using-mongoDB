import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";
import "dotenv/config";
import { uploadFile, getFileStream } from "./S3/fileParser.js";

const router = express.Router();
const prisma = new PrismaClient();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split === "text/plain" ||
    file.mimetype.split === "application/msword" ||
    file.mimetype.split ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
});

const multiUpload = upload.array("files", 2);

router.get("/", (req, res) => {
  res.status(200).json({ messaage: "File Upload route active" });
});

router.post("/upload", multiUpload, async (req, res) => {
  const file = req.file;
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  try {
    const result = await uploadFile(file);
    res.json({ status: "success", result });
  } catch (error) {
    console.error("There is being an error", error);
    res.status(500).send(error);
  }
});

export default router;
