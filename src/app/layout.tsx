import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://behic.io"),
  title: "Izzet Behic Sakar — Builder, Coach, AI & Blockchain Specialist",
  description:
    "Full‑stack developer, blockchain engineer, and calisthenics coach in Toronto. Projects in React/Flutter, AI copilots, blockchain (Solidity, BEP‑20, SPL), and Web3.",
  openGraph: {
    type: "website",
    url: "https://behic.io/",
    siteName: "Izzet Behic Sakar",
    title: "Izzet Behic Sakar — Builder, Coach, AI & Blockchain Specialist",
    description:
      "Full‑stack developer, blockchain engineer, and calisthenics coach in Toronto.",
    images: [
      {
        url: "/site-preview.png",
        width: 1200,
        height: 630,
        alt: "Izzet Behic Sakar — Portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Izzet Behic Sakar — Builder, Coach, AI & Blockchain Specialist",
    description:
      "Full‑stack developer, blockchain engineer, and calisthenics coach in Toronto.",
    images: ["/site-preview.png"],
  },
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
