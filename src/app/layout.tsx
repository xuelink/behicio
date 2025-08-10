import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Izzet Behic Sakar — Builder, Coach, AI tinkerer",
  description:
    "Full‑stack developer & calisthenics coach in Toronto. Projects in React/Flutter, AI copilots, and Web3.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-white via-white to-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
