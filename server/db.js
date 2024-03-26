import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGODB_URL;

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://michvel:jCKqyKrsLSMfHM5N@cluster0.kivbokg.mongodb.net/?retryWrites=true&w=majority&appName=TodoApp"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

  return;
};
