import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  items: {
    type: [String],
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
