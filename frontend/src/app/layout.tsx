import React from "react";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Dialectica - Never Lose an Argument Again",
  description:
    "Master the art of logical reasoning. Identify fallacies, strengthen your arguments, and engage in more meaningful discussions with AI-powered analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
            <ConditionalLayout>{children}</ConditionalLayout>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
