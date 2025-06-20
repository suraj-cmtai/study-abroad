import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Globe, Award, Clock, Users, Star } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <Skeleton className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="text-white max-w-3xl">
              <Skeleton className="h-7 w-20 mb-4 rounded-full bg-orange/60" />
              <Skeleton className="h-14 w-3/4 mb-4 rounded" />
              <Skeleton className="h-6 w-2/3 mb-6 rounded" />
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white/80" />
                  <Skeleton className="h-5 w-20 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white/80" />
                  <Skeleton className="h-5 w-28 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Skeleton className="h-5 w-16 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="h-8 w-48 mb-2"><Skeleton className="h-8 w-48 rounded" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-full mb-2 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                    <BookOpen className="h-8 w-8 text-orange mx-auto mb-2" />
                    <Skeleton className="h-5 w-20 mb-1 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                    <Globe className="h-8 w-8 text-orange mx-auto mb-2" />
                    <Skeleton className="h-5 w-24 mb-1 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg flex flex-col items-center">
                    <Award className="h-8 w-8 text-orange mx-auto mb-2" />
                    <Skeleton className="h-5 w-24 mb-1 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="h-8 w-48 mb-2"><Skeleton className="h-8 w-48 rounded" /></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <Skeleton className="h-5 w-40 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="h-8 w-48 mb-2"><Skeleton className="h-8 w-48 rounded" /></CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0"></div>
                      <Skeleton className="h-5 w-48 rounded" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {/* Career Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="h-8 w-56 mb-2"><Skeleton className="h-8 w-56 rounded" /></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="h-5 w-5 text-orange flex-shrink-0" />
                      <Skeleton className="h-5 w-40 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <Skeleton className="h-10 w-32 mx-auto mb-2 rounded" />
                  <Skeleton className="h-5 w-32 mx-auto rounded" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full rounded mb-2" />
                <Skeleton className="h-12 w-full rounded mb-2" />
                <Skeleton className="h-1 w-full rounded bg-gray-200" />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-navy" />
                      <Skeleton className="h-5 w-20 rounded" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Skeleton className="h-5 w-20 rounded" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-navy" />
                      <Skeleton className="h-5 w-20 rounded" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-navy" />
                      <Skeleton className="h-5 w-20 rounded" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange" />
                  <Skeleton className="h-6 w-32 rounded mb-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 