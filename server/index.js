import express from "express";
import cors from "cors";
import TaskRouter from "./routes/taskRouter.js";
import AuthRouter from "./routes/authRouter.js";
import UserRouter from "./routes/userRouter.js";
import CommentRouter from "./routes/commentRouter.js";

const app = express();
app.use(cors());
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  try {
    res.send({ message: "Hello from an Express API!" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.use("/todo", TaskRouter);
app.use("/auth", AuthRouter);
app.use("/users", UserRouter);
app.use("/comments", CommentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
