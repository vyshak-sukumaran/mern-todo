import mongoose, { Schema } from "mongoose";

export interface ITodo {
  title: string;
  isCompleted: boolean;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
