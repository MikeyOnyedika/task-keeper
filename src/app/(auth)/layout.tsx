import { ReactNode } from "react";
import { Logo } from "@/app/assets";
import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <header className="py-2 px-4">
        <Image src={Logo} alt=""/>
      </header>
      {children}
    </main>
  );
}
