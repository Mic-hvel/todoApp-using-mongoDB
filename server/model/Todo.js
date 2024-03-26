import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  taskTitle: {
    type: String,
  },
  comment: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

const Todo = model("Todo", todoSchema);
export default Todo;
