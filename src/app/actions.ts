"use server";

import { getServerSession } from "next-auth";
import options from "./api/(auth)/auth/[...nextauth]/options";

export async function isSessionStillActive() {
  const session = await getServerSession(options);
  if (!session) {
    return false;
  }
  return true;
}
