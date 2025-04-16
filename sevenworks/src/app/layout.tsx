// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from 'classnames';
import { ResumeProvider } from "./resumeContext";
import { FormProvider } from "./editor/formcontext";
import ClientProviders from "../components/ClientProviders";

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
        <FormProvider>
          <ResumeProvider>
            <ClientProviders>
              {children}
            </ClientProviders>
          </ResumeProvider>
        </FormProvider>
      </body>
    </html>
  );
}