import { getServerSession } from "next-auth";

export async function GET() {
  // get the current user
  const session = await getServerSession();
  if (!session) {
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
