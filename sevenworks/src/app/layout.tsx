// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import ClientProviders from "../components/ClientProviders"; // ✅ updated

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sevenworks",
  description: "Sevenworks app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, "antialiased bg-[#2b2d42]")}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}