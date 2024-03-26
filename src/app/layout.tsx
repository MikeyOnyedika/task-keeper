import type { Metadata } from "next";
import "./globals.css";
import font from "./font"


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
      <body className={`flex flex-col w-screen h-screen text-gray-75 ${font.className}`}>{children}</body>
    </html>
  );
}
