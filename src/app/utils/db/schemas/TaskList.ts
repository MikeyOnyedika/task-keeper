import { model, Schema } from "mongoose";
import { status, priority } from "@/app/constants";

const taskItemSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: [status.ACTIVE, status.COMPLETED, status.PAUSED, status.PENDING],
    },
    priority: {
      type: String,
      enum: [priority.HIGH, priority.MID, priority.LOW],
    },
    startDate: Date,
    deadline: Date,
    estimatedCompletionTime: String,
  },
  {
    timestamps: true,
  }
);

export const taskListSchema = new Schema(
  {
    title: String,
    status: {
      type: String,
      enum: [status.ACTIVE, status.COMPLETED, status.PAUSED, status.PENDING],
      defaultValue: status.PENDING,
    },
    taskItems: [taskItemSchema],
  },
  {
    timestamps: true,
  }
);

const TaskListModel = model("TaskList", taskListSchema);
export default TaskListModel