import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters Section Skeleton */}
      <section className="py-8 bg-white border-b">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="h-10 w-full md:w-72 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full flex flex-col overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-8 w-full bg-gray-200 rounded" />
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 rounded-full" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="h-9 w-24 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
