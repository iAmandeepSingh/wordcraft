import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordcraft AI | Craft Better Words with AI",
  description: "Wordcraft is your premium AI writing assistant. Effortlessly transform your text into professional, casual, or friendly tones with a single click.",
};

import Background from "@/components/ui/Background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} selection:bg-blue-100 dark:selection:bg-blue-900/30`}
      >
        <Background />
        <div className="relative z-0">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
