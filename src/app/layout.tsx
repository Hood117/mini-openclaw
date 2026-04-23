import { Analytics } from "@vercel/analytics/next" // Paste this at the TOP

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <Analytics /> {/* Add this right BEFORE the closing body tag */}
      </body>
    </html>
  )
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedCursor } from "@/components/AnimatedCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainHub – Personal AI Task Manager",
  description:
    "Summarize, plan, and create content with BrainHub — your intelligent AI task assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        <AnimatedCursor />
        {children}
      </body>
    </html>
  );
}
