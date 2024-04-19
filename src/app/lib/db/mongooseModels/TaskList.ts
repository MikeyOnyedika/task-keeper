import { model, Schema } from "mongoose";
import { status } from "@/app/constants";


export const taskListSchema = new Schema(
  {
    title: String,
    status: {
      type: String,
      enum: [status.IN_PROGRESS, status.COMPLETED, status.PAUSED, status.NOT_STARTED],
      defaultValue: status.NOT_STARTED,
    },
    taskItems: {
      type: Schema.Types.Array,
      ref: "Task"
    }
  },
  {
    timestamps: true,
  }
);

export const _TaskList = model("TaskList", taskListSchema);
