import { NextResponse } from "next/server";
import { MiddlewareFn } from "../types";
import z from "zod";

const zodSchema = z.object({
  username: z.coerce.string({ required_error: "Username is required" }),
  password: z
    .coerce.string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  email: z
    .coerce.string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const validateSignupBody: MiddlewareFn = async (req) => {
  const body = await req.json()
  console.log("body: ", body);
  try {
    zodSchema.parse(body);
    return NextResponse.next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.errors.map((e) => {
        return {
          message: e.message,
          field: e.path[0],
        };
      });

      return NextResponse.json(
        { errors },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Couldn't validate fields" },
      {
        status: 500,
      }
    );
  }
};
