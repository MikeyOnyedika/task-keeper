import { z } from "zod";
import { SignupBodyValidationResult } from "../types";

const zodSchema = z.object({
  username: z.coerce.string({ required_error: "Username is required" }),
  password: z.coerce
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  email: z.coerce
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
});

export function validateSignupBody(body: {
  [key: string]: string;
}): SignupBodyValidationResult {
  try {
    zodSchema.parse(body);
    return {
      operationStatus: "success",
      body: {
        username: body.username,
        password: body.password,
        email: body.email,
      },
    };
  } catch (err) {
    const error = err as z.ZodError;
    const errors = error.errors.map((e) => {
      return {
        message: e.message,
        field: e.path[0],
      };
    });
    return {
      operationStatus: "error",
      errors,
    };
  }
}
