"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/app/assets";
import { MdOutlineExitToApp as ExitIcon } from "react-icons/md";
import { IconContext } from "react-icons";
import { signOut } from "next-auth/react";

const homePath = "/";
const projectsPath = "/projects";

export default function Header() {
  const projectName = "Linkcache";
  const path = usePathname();
  return (
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
      <div>{/* <p>victor</p> */}</div>
      <button
        className={`flex items-center font-inherit hover:bg-gray-5 rounded-full py-1 px-3`}
        onClick={() => signOut()}
      >
        <IconContext.Provider value={{ className: `w-8 h-8 ` }}>
          <ExitIcon />
        </IconContext.Provider>
        <span>Exit</span>
      </button>
    </header>
  );
}
