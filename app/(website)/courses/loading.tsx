import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-navy text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Skeleton className="mx-auto h-10 md:h-16 w-2/3 md:w-1/2 mb-6 bg-white/10" />
            <Skeleton className="mx-auto h-6 w-1/2 md:w-1/3 bg-white/10" />
          </div>
        </div>
      </section>

      {/* Filters Section Skeleton */}
      <section className="py-8 bg-white border-b">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Skeleton className="h-10 w-full max-w-md rounded-md" />
            <div className="flex gap-4 w-full max-w-xs">
              <Skeleton className="h-10 w-[180px] rounded-md" />
              <Skeleton className="h-10 w-[180px] rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid Skeleton */}
      <section className="py-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-5 w-40 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full card-hover overflow-hidden flex flex-col">
                <div className="relative">
                  <Skeleton className="w-full h-48 object-cover" />
                  <Skeleton className="absolute top-4 left-4 h-7 w-20 rounded-md bg-orange/60" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-6 w-24 rounded-md border border-navy" />
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-7 w-3/4 mb-2 rounded" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full mb-2 rounded" />
                  <div className="flex items-center justify-between text-sm">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <Skeleton className="h-7 w-24 mb-1 rounded" />
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>
                    <Skeleton className="h-10 w-28 rounded-md" />
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
