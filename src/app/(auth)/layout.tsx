import { ReactNode } from "react";
import { Logo } from "@/app/assets";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Layout({ children }: { children: ReactNode }) {
  // try to see if there's a valid session
  const session = await getServerSession();
  if (session) {
    redirect("/projects");
  }

  return (
    <main>
      <header className="py-2 px-4">
        <Image src={Logo} alt="" />
      </header>
      {children}
    </main>
  );
}
