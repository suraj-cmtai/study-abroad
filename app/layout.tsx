import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import { Inter } from "next/font/google"


export const metadata: Metadata = {
  title: "Study Abroad",
  description: "Study Abroad app",
};

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
