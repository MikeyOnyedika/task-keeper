import { model, Schema } from "mongoose";

const projectSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
  tasksLists: {
    type: Schema.Types.Array,
    ref: "TaskList",
  },
});

export const _Project = model("Project", projectSchema);
