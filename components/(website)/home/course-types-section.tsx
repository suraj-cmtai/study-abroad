"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Award, Trophy } from "lucide-react"
import { SectionContainer } from "@/components/ui/section-container"
import { useRef } from "react"

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
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <SectionContainer background="white" className="py-20" ref={containerRef}>
      {/* Section Heading */}
      <motion.div
        style={{ y: headerY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={itemVariants}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
          Choose Your{" "}
          <span className="relative inline-block text-orange">
            Study Path
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
          From short-term certificates to advanced degrees, find the perfect program to match your career goals and
          aspirations.
        </p>
      </motion.div>

      {/* Course Cards */}
      <motion.div
        style={{ y: gridY }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {courseTypes.map(course => (
          <motion.div
            key={course.title}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card
              className={`h-full transition-shadow duration-300 hover:shadow-xl cursor-pointer ${course.color} border`}
            >
              <CardHeader className="text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto mb-4 p-3 bg-white rounded-full shadow-md w-fit"
                >
                  <course.icon className="h-8 w-8 text-navy" />
                </motion.div>
                <CardTitle className="text-xl text-navy">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{course.description}</p>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-navy shadow-sm"
                >
                  {course.duration}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
}
