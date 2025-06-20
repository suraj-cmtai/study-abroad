import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="h-10 w-2/3 mx-auto bg-white/10 rounded animate-pulse mb-4" style={{ height: 48 }} />
            <div className="h-6 w-1/2 mx-auto bg-white/10 rounded animate-pulse" style={{ height: 24 }} />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 animate-pulse" />
                  <Badge className="absolute top-3 left-3 bg-gray-300 animate-pulse w-20 h-6" />
                </div>
                <CardContent className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-full bg-gray-100 rounded mb-3 animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
