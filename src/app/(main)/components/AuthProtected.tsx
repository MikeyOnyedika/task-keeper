import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import options from "@/app/api/(auth)/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AuthStateMonitor from "./AuthStateMonitor";

export default async function AuthProtected({
  children,
}: {
  children: ReactNode;
}) {
  const requestHeader = headers();
  const referer = requestHeader.get("referer");
  let callbackUrl = referer || "/projects";
  const session = await getServerSession(options);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
  }
  return (
    <>
      <AuthStateMonitor />
      {children}
    </>
  );
}
