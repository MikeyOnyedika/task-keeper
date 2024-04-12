import User from "@/app/lib/db/models/user";
import { validateLoginBody } from "@/app/utils/validateLoginBody";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // validate the login body
        const validationResult = validateLoginBody(credentials);

        // check if the user exists in db
        if (validationResult.operationStatus === "error") {
          return {
            id: "",
            email: "",
            errors: validationResult.errors,
          };
        }

        const body = validationResult.body;
        const findUserResult = await User.findOneByEmail(body.email);
        if (findUserResult.operationStatus === "error") {
          return {
            id: "",
            email: "",
            error: "Couldn't complete request",
          };
        }

        const user = findUserResult.user;
        if (user == undefined) {
          return {
            id: "",
            email: "",
            error: "Email or Password was incorrect",
          };
        }

        return {
          id: user._id,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user: u }) {
      const user = u as unknown as any;
      if (user.error) {
        throw new Error(user.error);
      } else if (user.errors) {
        throw new Error(JSON.stringify(user.errors));
      } else {
        return true;
      }
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // expires in 7days
  },
};
export default options;
