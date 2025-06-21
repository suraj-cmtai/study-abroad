"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, ArrowRight, Search } from "lucide-react"
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
import Loading from "./loading"

export default function CoursesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const courses = useSelector(selectActiveCourses)
  const isLoading = useSelector(selectCourseLoading)
  const error = useSelector(selectCourseError)
  const hasFetched = useSelector(selectCourseHasFetched)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchActiveCourses())
    }
  }, [dispatch, hasFetched])

  // Get unique categories and levels from real data
  const categories = [...new Set(courses.map((course) => course.category))]
  const levels = [...new Set(courses.map((course) => course.level))]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  if (!hasFetched || isLoading) {
    return(<Loading/>)
  }else if (error) {
    return(<div className="text-center py-12">
      <p className="text-destructive text-lg">{error}</p>
    </div>)
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Our <span className="text-orange">Courses</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover world-class education programs designed to prepare you for global success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        <Button className="bg-navy hover:bg-navy/90">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>


          {hasFetched && !isLoading && !error && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
