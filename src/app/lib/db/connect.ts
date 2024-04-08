import mongoose from "mongoose";
import env from "@/app/env.config";

let cached = (global as any).mongoose;
if (!cached) {
  const initialMongooseValue = { conn: null };

  (global as any).mongoose = initialMongooseValue;
  cached = initialMongooseValue;
}

export async function connect() {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(env.DB_URI);
    return cached.conn;
  } catch (err) {
    console.log("error connecting to db: ", err);
    return null;
  }
}
