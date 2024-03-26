"use client";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/app/assets";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

const homePath = "/";
const projectsPath = "/projects";

export default function Layout({ children }: { children: ReactNode }) {
  const projectName = "Linkcache";
  const path = usePathname();

  return (
    <div className="flex flex-col h-full w-full"> 
      <header className="py-2 px-4 flex items-center justify-between">
        <div className="flex items-center font-bold gap-2">
          <Link href={homePath}>
            <Image src={Logo} alt="" className="w-8" />
          </Link>
          <span>&gt;</span>
          <Link href={projectsPath} className="hover:text-accent">
            projects
          </Link>
          {path !== projectsPath ? (
            <>
              <span>&gt;</span>
              <p>{projectName}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* <p>victor</p> */}
        </div>
      </header>
      <main className="flex w-full h-full">{children}</main>
    </div>
  );
}
