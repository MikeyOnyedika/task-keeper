import User from "@/app/lib/db/models/user";
import { validateLoginBody } from "@/app/utils/validateLoginBody";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
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
        // TODO: you should implement checking for password validity using bcrypt, but should return the same error message in any case
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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // this signIn callback is called immediately after the authorize function returns it's result. 'user' is whatever is returned from the authorize()
    async signIn({ user: u }) {
      const user = u as unknown as any;
      if (user.error) {
        throw new Error(user.error);
      } else if (user.errors) {
        // you have to JSON.parse() this on the frontend
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
