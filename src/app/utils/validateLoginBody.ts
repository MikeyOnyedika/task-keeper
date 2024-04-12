import { z } from "zod";
import {
  LoginBodyValidationResult,
} from "../types";

const zodSchema = z.object({
  password: z.coerce.string({ required_error: "Password is required" }),
  email: z.coerce.string({ required_error: "Email is required" }),
});

export function validateLoginBody(body: any): LoginBodyValidationResult {
  try {
    zodSchema.parse(body);
    return {
      operationStatus: "success",
      body: {
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
