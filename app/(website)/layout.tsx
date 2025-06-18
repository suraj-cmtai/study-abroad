// WEBSITE LAYOUT (app/(website)/layout.tsx)
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { Navigation } from "@/components/(website)/navigation"
import { Footer } from "@/components/(website)/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Study Abroad - Your Gateway to Global Education",
  description: "Discover world-class education opportunities abroad with our comprehensive study abroad programs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}