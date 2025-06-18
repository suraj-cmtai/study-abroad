"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full relative">
        <div className="relative h-96">
          <div className="w-full h-full bg-gray-200 animate-pulse" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-white max-w-4xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-white/20 rounded-full animate-pulse" />
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="h-12 w-3/4 bg-white/20 rounded animate-pulse" />
              <div className="flex items-center gap-4">
                <div className="h-8 w-40 bg-white/20 rounded animate-pulse" />
                <div className="h-8 w-40 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 mb-8">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 w-full bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
