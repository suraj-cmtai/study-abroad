"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import {
  fetchActiveCourses,
  selectActiveCourses,
  selectCourseLoading,
  selectCourseError,
  selectCourseHasFetched,
} from "@/lib/redux/features/courseSlice"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {Array.from({ length: 3 }).map((_, i) => (
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
  )
}

export function CoursesPreview() {
  const dispatch = useDispatch<AppDispatch>()
  const courses = useSelector(selectActiveCourses)
  const isLoading = useSelector(selectCourseLoading)
  const error = useSelector(selectCourseError)
  const hasFetched = useSelector(selectCourseHasFetched)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchActiveCourses())
    }
  }, [dispatch, hasFetched])

  // Sort by enrollmentCount desc, take top 3
  const featuredCourses = [...courses]
    .sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0))
    .slice(0, 3)

  return (
    <section className="w-full py-20 bg-gray-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Featured{" "}
            <span className="relative inline-block text-orange">
              Courses
              <motion.div
                className="absolute -bottom-1 left-0 h-1 w-full bg-orange/50 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular study abroad programs designed to give you a competitive edge in the global market.
          </p>
        </motion.div>

        {/* Loading State */}
        {(!hasFetched || isLoading) && <LoadingPreview />}

        {/* Error State */}
        {hasFetched && error && (
          <div className="text-center py-8 text-destructive">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {hasFetched && !isLoading && !error && featuredCourses.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredCourses.map(course => (
            <motion.div
              key={course.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full card-hover overflow-hidden">
                  <div
                    className="relative h-48"
                    style={{
                      backgroundImage: `url('/placeholder.svg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange text-white">{course.level}</Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-navy border-navy">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      4.8
                    </div>
                  </div>
                  <CardTitle className="text-xl text-navy line-clamp-2">{course.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrollmentCount} enrolled
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                        <div className="text-2xl font-bold text-navy">${course.price?.toLocaleString?.() ?? course.price}</div>
                      <div className="text-sm text-gray-500">Total Program</div>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                        <Button className="bg-navy hover:bg-navy/90 group">
                        Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* No Courses State */}
        {hasFetched && !isLoading && !error && featuredCourses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-semibold">No featured courses available at the moment.</p>
        </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/courses">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8 group">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
