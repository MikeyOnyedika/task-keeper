import type { Metadata } from "next";
import "./globals.css";
import font from "./font";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Task Keeper",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col w-screen h-screen text-gray-75 ${font.className}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
