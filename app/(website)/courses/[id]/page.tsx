"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, Star, BookOpen, Award, Globe, ArrowRight } from "lucide-react"
import { useEffect } from "react"

// Mock data - replace with actual API call
const courseDetails = {
  id: "1",
  title: "International Business Management",
  category: "Business",
  duration: "2 years",
  level: "Master" as const,
  price: 25000,
  instructor: "Dr. Sarah Johnson",
  enrollmentCount: 150,
  image: "/placeholder.svg?height=400&width=800",
  description:
    "This comprehensive Master's program in International Business Management is designed to prepare students for leadership roles in the global marketplace. The curriculum combines theoretical knowledge with practical applications, covering areas such as international trade, cross-cultural management, global marketing strategies, and international finance.",
  status: "Active" as const,
  learningHours: "1,200 hours",
  modeOfDelivery: "Hybrid (Online + On-campus)",
  modeOfAssessment: "Assignments, Projects, Exams",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
}

const courseModules = [
  "Global Business Environment",
  "International Marketing",
  "Cross-Cultural Management",
  "International Finance",
  "Supply Chain Management",
  "Strategic Management",
  "Business Ethics & Sustainability",
  "Capstone Project",
]

const prerequisites = [
  "Bachelor's degree in Business or related field",
  "Minimum 3.0 GPA",
  "IELTS 6.5 or TOEFL 90+",
  "2+ years work experience (preferred)",
]

const careerOpportunities = [
  "International Business Manager",
  "Global Marketing Director",
  "Export/Import Manager",
  "International Trade Consultant",
  "Multinational Corporation Executive",
  "Business Development Manager",
]

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  useEffect(() => {
    // Simulate fetching course details based on ID
    const fetchCourseDetails = async () => {
      const resolvedParams = await params;
      const courseId = resolvedParams.id;
      // Fetch course details from API or database
    };
    fetchCourseDetails();
  }, [params]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <img
            src={courseDetails.image || "/placeholder.svg"}
            alt={courseDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-ful max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-3xl"
            >
              <Badge className="bg-orange text-white mb-4">{courseDetails.level}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{courseDetails.title}</h1>
              <p className="text-xl text-gray-200 mb-6">{courseDetails.description.substring(0, 200)}...</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {courseDetails.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {courseDetails.enrollmentCount} enrolled
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                  4.8 rating
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-navy">Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{courseDetails.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-orange mx-auto mb-2" />
                      <div className="font-semibold text-navy">{courseDetails.learningHours}</div>
                      <div className="text-sm text-gray-600">Learning Hours</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Globe className="h-8 w-8 text-orange mx-auto mb-2" />
                      <div className="font-semibold text-navy">{courseDetails.modeOfDelivery}</div>
                      <div className="text-sm text-gray-600">Mode of Delivery</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Award className="h-8 w-8 text-orange mx-auto mb-2" />
                      <div className="font-semibold text-navy">{courseDetails.modeOfAssessment}</div>
                      <div className="text-sm text-gray-600">Assessment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Modules */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-navy">Course Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseModules.map((module, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{module}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-navy">Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-navy">Career Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {careerOpportunities.map((career, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="h-5 w-5 text-orange flex-shrink-0" />
                        <span className="text-gray-700">{career}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-navy mb-2">${courseDetails.price.toLocaleString()}</div>
                    <div className="text-gray-600">Total Program Fee</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-orange hover:bg-orange/90 text-white py-3">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white">
                    Download Brochure
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{courseDetails.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{courseDetails.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{courseDetails.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium">{courseDetails.instructor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-navy">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Have questions about this course? Our counselors are here to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Counselor
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
