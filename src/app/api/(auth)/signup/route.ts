// import { connect } from "@/app/lib/db/connect";

import User from "@/app/lib/db/models/user";
import { checkUserAlreadyExists } from "@/app/utils/checkUserAlreadyExists";
import { hashPassword } from "@/app/utils/hashPassword";
import { validateSignupBody } from "@/app/utils/validateSignupBody";

// handle creating new user in database
export const POST = async (req: Request) => {
  // validate request body
  const result = validateSignupBody(await req.json());
  if (result.operationStatus === "error") {
    return Response.json(
      {
        errors: result.errors,
      },
      {
        status: 400,
      }
    );
  }

  const { username, password, email } = result.body;
  // check that no user already has that email
  const userAlreadyExists = await checkUserAlreadyExists(email);
  if (userAlreadyExists.operationStatus === "error") {
    return Response.json(
      {
        error: userAlreadyExists.error,
      },
      {
        status: 500,
      }
    );
  } else {
    if (userAlreadyExists.userAlreadyExists) {
      return Response.json(
        {
          message: "User already exists. Try logging in instead",
        },
        {
          status: 200,
        }
      );
    }
  }

  // hash the password
  const hashedPassword = hashPassword(password);

  // try to add to db
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user.operationStatus === "error") {
    return Response.json(
      {
        error: "Couldn't complete creating your account",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    {
      message: "User created successfully!",
      data: {
        user: user.user,
      },
    },
    { status: 201 }
  );
};
