"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src="/file.svg"
                alt="Blog not found"
                className="w-32 h-32 mx-auto opacity-75"
              />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-bold text-navy mb-4">
            Blog Not Found
          </h1>

          
          <div className="flex items-center justify-center gap-4">
            <Link href="/blogs">
              <Button className="bg-orange hover:bg-orange/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
