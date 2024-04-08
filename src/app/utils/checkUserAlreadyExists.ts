import User from "../lib/db/models/user";
import { CheckUserAlreadyExistsResult } from "../types";

// checks if user with email already exists in database
export async function checkUserAlreadyExists(
  email: string
): Promise<CheckUserAlreadyExistsResult> {
  try {
    const user = await User.findOneByEmail(email);
    const operationStatus = "success";

    if (user) {
      return {
        operationStatus,
        userAlreadyExists: true,
      };
    }
    return {
      operationStatus,
      userAlreadyExists: false,
    };
  } catch (err) {
    console.log("checkuserexists err: ", err);
    return {
      operationStatus: "error",
      error: "Failed to complete request",
    };
  }
}
