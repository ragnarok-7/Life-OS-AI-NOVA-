import type { Metadata } from "next";
import AIMemoryEngine from "@/components/AIMemoryEngine";
import AIBehaviorEngine from "@/components/AIBehaviorEngine";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import {
  LifeOSProvider,
} from "@/context/LifeOSContext";

const geistSans = Geist({
  variable:
    "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono =
  Geist_Mono({
    variable:
      "--font-geist-mono",
    subsets: ["latin"],
  });

export const metadata: Metadata =
  {
    title: "Life OS AI",
    description:
      "AI-powered life operating system",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">

        <LifeOSProvider>
          <AIMemoryEngine />
          <AIBehaviorEngine />

          {children}
          

        </LifeOSProvider>

      </body>

    </html>
  );
}