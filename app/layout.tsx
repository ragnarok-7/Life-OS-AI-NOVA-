import type {
  Metadata,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import {
  LifeOSProvider,
} from "@/context/LifeOSContext";

import AIBehaviorEngine from "@/components/AIBehaviorEngine";

const geistSans =
  Geist({
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

export const metadata:
  Metadata = {

  title:
    "NOVA AI OS",

  description:
    "Adaptive AI Operating System",
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

      <body className="min-h-screen bg-black text-white">

        <LifeOSProvider>

          {/* Global AI Engine */}
          <AIBehaviorEngine />

          {children}

        </LifeOSProvider>

      </body>

    </html>
  );
}