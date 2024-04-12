import User from "@/app/lib/db/models/user";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  // get the current user
  const session = await getServerSession();

  if (!session) {
    console.log("session: ", session);
    // const user = await User.findOneByEmail();

    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
