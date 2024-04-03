import { InferSchemaType, model, Schema, SchemaDefinition } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
