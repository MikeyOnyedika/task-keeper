import Logo from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Github } from "./assets";

export default function Home() {
  const githubRepo = "#";
  const loginPath = "/login"
  const signupPath = "/signup"
  return (
    <div className="flex flex-col h-full w-full overflow-auto  gap-12">
      <header className="flex justify-between items-center py-2 px-4">
        <Image src={Logo} alt="" className="w-12" />
        <div className="flex gap-2 items-center">
          <Link className="" href={loginPath}>
            Login
          </Link>
          <Link
            className="border-2 rounded px-3 py-1.5 hover:bg-secondary hover:text-primary"
            href={signupPath}
          >
            Signup
          </Link>
        </div>
      </header>
      <main className="flex flex-col h-full  gap-12">
        <section className="flex flex-col gap-4 items-center">
          <Image src={Logo} alt="" className="w-[20rem]" />
          <h1 className="text-4xl font-bold">Task Keeper</h1>
          <p>An app to organise tasks and todos for your side projects</p>

          <div className="flex items-center gap-8">
            <Link
              className="px-4 py-2.5 rounded shadow bg-accent text-primary"
              href={signupPath}
            >
              Get Started
            </Link>

            <Link href={githubRepo} className="flex items-center gap-2 rounded border-2 border-gray-75 px-4 py-2 ">
              <Image src={Github} alt="" className="w-4" />
              <span>source code</span>
            </Link>
          </div>
        </section>
      </main>
      <footer className="flex flex-col items-center py-4 px-4 bg-gray-75 text-primary">
        <p>Made by mikeyv</p>
        <p>2024</p>
      </footer>
    </div>
  );
}
