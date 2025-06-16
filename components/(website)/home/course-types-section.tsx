"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Award, Trophy } from "lucide-react"

const courseTypes = [
  {
    icon: BookOpen,
    title: "Certificate Programs",
    description: "Short-term specialized courses to enhance your skills",
    duration: "3-6 months",
    color: "bg-blue-50 border-blue-200",
  },
  {
    icon: Award,
    title: "Diploma Courses",
    description: "Professional diplomas for career advancement",
    duration: "6-12 months",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: GraduationCap,
    title: "Bachelor Degrees",
    description: "Undergraduate programs from top universities",
    duration: "3-4 years",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: Trophy,
    title: "Master Programs",
    description: "Advanced degrees for professional growth",
    duration: "1-2 years",
    color: "bg-purple-50 border-purple-200",
  },
]

export function CourseTypesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Choose Your <span className="text-orange">Study Path</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From short-term certificates to advanced degrees, find the perfect program to match your career goals and
            aspirations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseTypes.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full card-hover cursor-pointer ${course.color}`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full shadow-md w-fit">
                    <course.icon className="h-8 w-8 text-navy" />
                  </div>
                  <CardTitle className="text-xl text-navy">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-navy">
                    {course.duration}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
