import { ReactNode } from "react";
import Header from "./components/Header";
import AuthProtected from "./components/AuthProtected";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full">
      <AuthProtected>
        <Header />
        <main className="flex w-full h-full">{children}</main>
      </AuthProtected>
    </div>
  );
}
