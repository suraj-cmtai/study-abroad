"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const featuredCourses = [
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
  },
]

export function CoursesPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Featured <span className="text-orange">Courses</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular study abroad programs designed to give you a competitive edge in the global market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/courses">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
