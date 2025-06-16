"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, ArrowRight, Search } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const allCourses = [
  {
    id: "1",
    title: "International Business Management",
    category: "Business",
    duration: "2 years",
    level: "Master" as const,
    price: 25000,
    instructor: "Dr. Sarah Johnson",
    enrollmentCount: 150,
    image: "/placeholder.svg?height=200&width=300",
    description: "Comprehensive program covering global business strategies and international market dynamics.",
    status: "Active" as const,
  },
  {
    id: "2",
    title: "Computer Science & AI",
    category: "Technology",
    duration: "4 years",
    level: "Bachelor" as const,
    price: 35000,
    instructor: "Prof. Michael Chen",
    enrollmentCount: 200,
    image: "/placeholder.svg?height=200&width=300",
    description: "Cutting-edge curriculum in computer science with specialization in artificial intelligence.",
    status: "Active" as const,
  },
  {
    id: "3",
    title: "Digital Marketing Certificate",
    category: "Marketing",
    duration: "6 months",
    level: "Beginner" as const,
    price: 5000,
    instructor: "Emma Rodriguez",
    enrollmentCount: 75,
    image: "/placeholder.svg?height=200&width=300",
    description: "Learn modern digital marketing strategies and tools used by industry professionals.",
    status: "Active" as const,
  },
  {
    id: "4",
    title: "International Relations",
    category: "Political Science",
    duration: "3 years",
    level: "Bachelor" as const,
    price: 28000,
    instructor: "Dr. James Wilson",
    enrollmentCount: 120,
    image: "/placeholder.svg?height=200&width=300",
    description: "Study global politics, diplomacy, and international affairs in depth.",
    status: "Active" as const,
  },
  {
    id: "5",
    title: "Data Science & Analytics",
    category: "Technology",
    duration: "18 months",
    level: "Master" as const,
    price: 32000,
    instructor: "Dr. Lisa Park",
    enrollmentCount: 180,
    image: "/placeholder.svg?height=200&width=300",
    description: "Master the art of data analysis, machine learning, and statistical modeling.",
    status: "Active" as const,
  },
  {
    id: "6",
    title: "Sustainable Engineering",
    category: "Engineering",
    duration: "4 years",
    level: "Bachelor" as const,
    price: 38000,
    instructor: "Prof. Robert Green",
    enrollmentCount: 95,
    image: "/placeholder.svg?height=200&width=300",
    description: "Focus on environmentally sustainable engineering solutions and green technology.",
    status: "Active" as const,
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const categories = [...new Set(allCourses.map((course) => course.category))]
  const levels = [...new Set(allCourses.map((course) => course.level))]

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {allCourses.length} courses
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
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
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
                        <div className="text-2xl font-bold text-navy">${course.price.toLocaleString()}</div>
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

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
