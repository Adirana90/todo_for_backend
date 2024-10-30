import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["todo", "in_progress", "done"],
    default: "todo",
  },
  created_at: { type: Date, default: Date.now },
});

export const TodoModel = mongoose.model("todo", todoSchema);
