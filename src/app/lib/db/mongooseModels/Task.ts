import { model, Schema } from "mongoose"
import { status, priority } from "@/app/constants"

const taskItemSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: [status.IN_PROGRESS, status.COMPLETED, status.PAUSED, status.NOT_STARTED],
      defaultValue: status.NOT_STARTED,
    },
    priority: {
      type: String,
      required: true,
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

export const _Task = model("Task", taskItemSchema);
