import React from "react";
import { Inter } from "next/font/google";
import { Navigation, Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Penganalisis Kesalahan Logika",
  description:
    "Aplikasi untuk menganalisis logical fallacies dalam teks dengan bantuan AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
