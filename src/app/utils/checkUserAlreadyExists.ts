import User from "../lib/db/models/user";
import { CheckUserAlreadyExistsResult } from "../types";

// checks if user with email already exists in database
export async function checkUserAlreadyExists(
  email: string
): Promise<CheckUserAlreadyExistsResult> {
  try {
    const findUserResult = await User.findOneByEmail(email);
    const operationStatus = "success";

    if (findUserResult.operationStatus === "error") {
      return {
        operationStatus: "error",
        error: findUserResult.error,
      };
    }

    if (findUserResult.user) {
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
    return {
      operationStatus: "error",
      error: "Failed to complete request",
    };
  }
}
