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
        return null;
      },
    }),
  ],
};
export default options;
