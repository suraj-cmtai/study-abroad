"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  FileText,
  Award,
  MapPin,
  Phone,
  Mail,
  Edit,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Trophy,
} from "lucide-react"

// Mock data - replace with actual API call
const studentProfile = {
  id: "student_123",
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  dateOfBirth: "1998-05-15",
  nationality: "Indian",
  avatar: "/placeholder.svg?height=120&width=120",
  address: {
    street: "123 MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400001",
  },
  academicInfo: {
    currentLevel: "Bachelor" as const,
    institution: "University of Mumbai",
    fieldOfStudy: "Computer Science",
    gpa: 8.5,
    graduationYear: 2024,
  },
  preferences: {
    preferredCountries: ["USA", "Canada", "UK"],
    preferredFields: ["Computer Science", "Data Science", "AI/ML"],
    budgetRange: {
      min: 20000,
      max: 50000,
    },
  },
  enrolledCourses: [
    {
      id: "ec_1",
      courseId: "1",
      courseName: "International Business Management",
      courseImage: "/placeholder.svg?height=100&width=150",
      category: "Business",
      instructor: "Dr. Sarah Johnson",
      enrollmentDate: "2024-01-15",
      status: "Active" as const,
      progress: 65,
      completionDate: null,
      grade: null,
      certificateUrl: null,
    },
    {
      id: "ec_2",
      courseId: "2",
      courseName: "Digital Marketing Certificate",
      courseImage: "/placeholder.svg?height=100&width=150",
      category: "Marketing",
      instructor: "Emma Rodriguez",
      enrollmentDate: "2023-11-01",
      status: "Completed" as const,
      progress: 100,
      completionDate: "2024-01-10",
      grade: "A",
      certificateUrl: "/certificates/digital-marketing.pdf",
    },
  ],
  completedTests: [
    {
      id: "test_1",
      testName: "IELTS Academic",
      testType: "IELTS" as const,
      score: "7.5",
      maxScore: "9.0",
      testDate: "2023-12-15",
      validUntil: "2025-12-15",
      certificateUrl: "/certificates/ielts.pdf",
      attempts: 1,
    },
    {
      id: "test_2",
      testName: "GRE General Test",
      testType: "GRE" as const,
      score: "320",
      maxScore: "340",
      testDate: "2024-01-20",
      validUntil: "2029-01-20",
      certificateUrl: "/certificates/gre.pdf",
      attempts: 2,
    },
  ],
  applications: [
    {
      id: "app_1",
      universityName: "Stanford University",
      courseName: "MS Computer Science",
      country: "USA",
      applicationDate: "2024-01-01",
      status: "Under Review" as const,
      deadline: "2024-03-15",
      requirements: [
        {
          id: "req_1",
          name: "Transcripts",
          status: "Approved" as const,
          submittedDate: "2024-01-05",
          documentUrl: "/documents/transcripts.pdf",
        },
        {
          id: "req_2",
          name: "Statement of Purpose",
          status: "Submitted" as const,
          submittedDate: "2024-01-10",
          documentUrl: "/documents/sop.pdf",
        },
      ],
      notes: "Strong application with good test scores",
    },
  ],
  achievements: [
    {
      id: "ach_1",
      title: "IELTS Band 7.5",
      description: "Achieved overall band score of 7.5 in IELTS Academic",
      type: "Test Score" as const,
      date: "2023-12-15",
      icon: "trophy",
    },
    {
      id: "ach_2",
      title: "Digital Marketing Certification",
      description: "Successfully completed Digital Marketing Certificate program",
      type: "Certification" as const,
      date: "2024-01-10",
      icon: "award",
    },
  ],
  createdAt: "2023-10-01T00:00:00Z",
  updatedAt: "2024-01-20T00:00:00Z",
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Approved":
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Under Review":
      case "Submitted":
        return "bg-yellow-100 text-yellow-800"
      case "Rejected":
      case "Dropped":
        return "bg-red-100 text-red-800"
      case "Paused":
      case "Pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <><h1>Profile</h1></>
    // <div className="min-h-screen bg-gray-50">
    //   {/* Profile Header */}
    //   <section className="bg-navy text-white py-12">
    //     <div className="container mx-auto px-4">
    //       <motion.div
    //         initial={{ opacity: 0, y: 30 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.8 }}
    //         className="flex flex-col md:flex-row items-center gap-8"
    //       >
    //         <Avatar className="h-32 w-32 border-4 border-orange">
    //           <AvatarImage src={studentProfile.avatar || "/placeholder.svg"} alt="Profile" />
    //           <AvatarFallback className="text-2xl bg-orange text-white">
    //             {studentProfile.firstName[0]}
    //             {studentProfile.lastName[0]}
    //           </AvatarFallback>
    //         </Avatar>

    //         <div className="text-center md:text-left flex-1">
    //           <h1 className="text-4xl font-bold mb-2">
    //             {studentProfile.firstName} {studentProfile.lastName}
    //           </h1>
    //           <p className="text-xl text-gray-300 mb-4">{studentProfile.academicInfo.fieldOfStudy} Student</p>

    //           <div className="flex flex-wrap gap-4 text-sm text-gray-300">
    //             <div className="flex items-center">
    //               <Mail className="h-4 w-4 mr-2" />
    //               {studentProfile.email}
    //             </div>
    //             <div className="flex items-center">
    //               <Phone className="h-4 w-4 mr-2" />
    //               {studentProfile.phone}
    //             </div>
    //             <div className="flex items-center">
    //               <MapPin className="h-4 w-4 mr-2" />
    //               {studentProfile.address.city}, {studentProfile.address.country}
    //             </div>
    //           </div>
    //         </div>

    //         <Button className="bg-orange hover:bg-orange/90">
    //           <Edit className="h-4 w-4 mr-2" />
    //           Edit Profile
    //         </Button>
    //       </motion.div>
    //     </div>
    //   </section>

    //   {/* Profile Content */}
    //   <div className="container mx-auto px-4 py-8">
    //     <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
    //       <TabsList className="grid w-full grid-cols-5">
    //         <TabsTrigger value="overview">Overview</TabsTrigger>
    //         <TabsTrigger value="courses">Courses</TabsTrigger>
    //         <TabsTrigger value="tests">Tests</TabsTrigger>
    //         <TabsTrigger value="applications">Applications</TabsTrigger>
    //         <TabsTrigger value="documents">Documents</TabsTrigger>
    //       </TabsList>

    //       {/* Overview Tab */}
    //       <TabsContent value="overview" className="space-y-6">
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {/* Academic Info */}
    //           <Card>
    //             <CardHeader>
    //               <CardTitle className="flex items-center text-navy">
    //                 <BookOpen className="h-5 w-5 mr-2" />
    //                 Academic Information
    //               </CardTitle>
    //             </CardHeader>
    //             <CardContent className="space-y-3">
    //               <div>
    //                 <span className="text-sm text-gray-600">Current Level:</span>
    //                 <p className="font-medium">{studentProfile.academicInfo.currentLevel}</p>
    //               </div>
    //               <div>
    //                 <span className="text-sm text-gray-600">Institution:</span>
    //                 <p className="font-medium">{studentProfile.academicInfo.institution}</p>
    //               </div>
    //               <div>
    //                 <span className="text-sm text-gray-600">Field of Study:</span>
    //                 <p className="font-medium">{studentProfile.academicInfo.fieldOfStudy}</p>
    //               </div>
    //               <div>
    //                 <span className="text-sm text-gray-600">GPA:</span>
    //                 <p className="font-medium">{studentProfile.academicInfo.gpa}/10</p>
    //               </div>
    //             </CardContent>
    //           </Card>

    //           {/* Quick Stats */}
    //           <Card>
    //             <CardHeader>
    //               <CardTitle className="flex items-center text-navy">
    //                 <Trophy className="h-5 w-5 mr-2" />
    //                 Quick Stats
    //               </CardTitle>
    //             </CardHeader>
    //             <CardContent className="space-y-4">
    //               <div className="flex justify-between items-center">
    //                 <span className="text-sm text-gray-600">Enrolled Courses</span>
    //                 <Badge className="bg-navy">{studentProfile.enrolledCourses.length}</Badge>
    //               </div>
    //               <div className="flex justify-between items-center">
    //                 <span className="text-sm text-gray-600">Tests Completed</span>
    //                 <Badge className="bg-orange">{studentProfile.completedTests.length}</Badge>
    //               </div>
    //               <div className="flex justify-between items-center">
    //                 <span className="text-sm text-gray-600">Applications</span>
    //                 <Badge className="bg-green-600">{studentProfile.applications.length}</Badge>
    //               </div>
    //               <div className="flex justify-between items-center">
    //                 <span className="text-sm text-gray-600">Achievements</span>
    //                 <Badge className="bg-purple-600">{studentProfile.achievements.length}</Badge>
    //               </div>
    //             </CardContent>
    //           </Card>

    //           {/* Recent Achievements */}
    //           <Card>
    //             <CardHeader>
    //               <CardTitle className="flex items-center text-navy">
    //                 <Award className="h-5 w-5 mr-2" />
    //                 Recent Achievements
    //               </CardTitle>
    //             </CardHeader>
    //             <CardContent className="space-y-3">
    //               {studentProfile.achievements.slice(0, 3).map((achievement) => (
    //                 <div key={achievement.id} className="flex items-start space-x-3">
    //                   <Trophy className="h-4 w-4 text-orange mt-1 flex-shrink-0" />
    //                   <div>
    //                     <p className="font-medium text-sm">{achievement.title}</p>
    //                     <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </TabsContent>

    //       {/* Courses Tab */}
    //       <TabsContent value="courses" className="space-y-6">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {studentProfile.enrolledCourses.map((course) => (
    //             <Card key={course.id} className="card-hover">
    //               <CardContent className="p-6">
    //                 <div className="flex items-start space-x-4">
    //                   <img
    //                     src={course.courseImage || "/placeholder.svg"}
    //                     alt={course.courseName}
    //                     className="w-16 h-16 object-cover rounded-lg"
    //                   />
    //                   <div className="flex-1">
    //                     <div className="flex items-start justify-between mb-2">
    //                       <h3 className="font-semibold text-navy">{course.courseName}</h3>
    //                       <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
    //                     </div>
    //                     <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
    //                     <p className="text-sm text-gray-600 mb-3">
    //                       Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
    //                     </p>

    //                     {course.status === "Active" && (
    //                       <div className="space-y-2">
    //                         <div className="flex justify-between text-sm">
    //                           <span>Progress</span>
    //                           <span>{course.progress}%</span>
    //                         </div>
    //                         <Progress value={course.progress} className="h-2" />
    //                       </div>
    //                     )}

    //                     {course.status === "Completed" && course.certificateUrl && (
    //                       <Button size="sm" className="mt-2 bg-orange hover:bg-orange/90">
    //                         <Download className="h-4 w-4 mr-2" />
    //                         Certificate
    //                       </Button>
    //                     )}
    //                   </div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </TabsContent>

    //       {/* Tests Tab */}
    //       <TabsContent value="tests" className="space-y-6">
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {studentProfile.completedTests.map((test) => (
    //             <Card key={test.id} className="card-hover">
    //               <CardContent className="p-6">
    //                 <div className="flex items-start justify-between mb-4">
    //                   <div>
    //                     <h3 className="font-semibold text-navy">{test.testName}</h3>
    //                     <Badge variant="outline" className="mt-1">
    //                       {test.testType}
    //                     </Badge>
    //                   </div>
    //                   <div className="text-right">
    //                     <div className="text-2xl font-bold text-orange">{test.score}</div>
    //                     <div className="text-sm text-gray-600">/ {test.maxScore}</div>
    //                   </div>
    //                 </div>

    //                 <div className="space-y-2 text-sm text-gray-600">
    //                   <div className="flex justify-between">
    //                     <span>Test Date:</span>
    //                     <span>{new Date(test.testDate).toLocaleDateString()}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span>Valid Until:</span>
    //                     <span>{new Date(test.validUntil).toLocaleDateString()}</span>
    //                   </div>
    //                   <div className="flex justify-between">
    //                     <span>Attempts:</span>
    //                     <span>{test.attempts}</span>
    //                   </div>
    //                 </div>

    //                 {test.certificateUrl && (
    //                   <Button size="sm" className="mt-4 w-full bg-navy hover:bg-navy/90">
    //                     <Eye className="h-4 w-4 mr-2" />
    //                     View Certificate
    //                   </Button>
    //                 )}
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </TabsContent>

    //       {/* Applications Tab */}
    //       <TabsContent value="applications" className="space-y-6">
    //         {studentProfile.applications.map((application) => (
    //           <Card key={application.id} className="card-hover">
    //             <CardContent className="p-6">
    //               <div className="flex items-start justify-between mb-4">
    //                 <div>
    //                   <h3 className="font-semibold text-navy text-lg">{application.universityName}</h3>
    //                   <p className="text-gray-600">{application.courseName}</p>
    //                   <p className="text-sm text-gray-500">{application.country}</p>
    //                 </div>
    //                 <div className="text-right">
    //                   <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
    //                   <p className="text-sm text-gray-600 mt-1">
    //                     Deadline: {new Date(application.deadline).toLocaleDateString()}
    //                   </p>
    //                 </div>
    //               </div>

    //               <div className="space-y-3">
    //                 <h4 className="font-medium text-navy">Requirements Status:</h4>
    //                 {application.requirements.map((req) => (
    //                   <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    //                     <span className="text-sm">{req.name}</span>
    //                     <div className="flex items-center space-x-2">
    //                       <Badge className={getStatusColor(req.status)} variant="outline">
    //                         {req.status}
    //                       </Badge>
    //                       {req.status === "Approved" && <CheckCircle className="h-4 w-4 text-green-600" />}
    //                       {req.status === "Pending" && <Clock className="h-4 w-4 text-yellow-600" />}
    //                       {req.status === "Rejected" && <AlertCircle className="h-4 w-4 text-red-600" />}
    //                     </div>
    //                   </div>
    //                 ))}
    //               </div>

    //               {application.notes && (
    //                 <div className="mt-4 p-3 bg-blue-50 rounded-lg">
    //                   <p className="text-sm text-blue-800">{application.notes}</p>
    //                 </div>
    //               )}
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </TabsContent>

    //       {/* Documents Tab */}
    //       <TabsContent value="documents" className="space-y-6">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle className="text-navy">Document Management</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="text-center py-8">
    //               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    //               <p className="text-gray-600 mb-4">Document management system coming soon</p>
    //               <Button className="bg-orange hover:bg-orange/90">Upload Documents</Button>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
    //     </Tabs>
    //   </div>

      
    // </div>
  )
}
