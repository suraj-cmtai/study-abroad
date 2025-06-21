"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Globe,
  HeadphonesIcon,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import {
  createContact,
  selectContactLoading,
  selectContactError,
} from "@/lib/redux/features/contactSlice"
import { useSearchParams } from "next/navigation"

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["Suite 807, 8th Floor, Building 91,Bhandari House, Nehru Place, New Delhi 110019"],
    color: "text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 981-892-9900", "+91 977-397-6221", "Sun-Sat: 10AM-7:30PM IST"],
    color: "text-green-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@studyabroadind.com"],
    color: "text-orange",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Sunday - Saturday: 10:00 AM - 7:30 PM"],
    color: "text-purple-600",
  },
]

const subjects = [
  "General Inquiry",
  "Course Information",
  "Admission Guidance",
  "Visa Assistance",
  "Scholarship Information",
  "Technical Support",
  "Partnership Opportunities",
  "Other",
]

export default function ContactPage() {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector(selectContactLoading)
  const error = useSelector(selectContactError)
  const searchParams = useSearchParams()
  const courseParam = searchParams.get("course")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: courseParam ? "Course Information" : "",
    message: courseParam ? `I am interested in the course: ${courseParam}` : "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (courseParam) {
      setFormData((prev) => ({
        ...prev,
        subject: "Course Information",
        message: `I am interested in the course: ${courseParam}`,
      }))
    }
  }, [courseParam])

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", formData.name)
    data.append("email", formData.email)
    data.append("phone", formData.phone)
    data.append("subject", formData.subject)
    data.append("message", formData.message)
    try {
      await dispatch(createContact(data)).unwrap()
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: courseParam ? "Course Information" : "",
        message: courseParam ? `I am interested in the course: ${courseParam}` : "",
      })
      setTimeout(() => setIsSubmitted(false), 4000)
    } catch (err) {
      // error handled by redux
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              Get in <span className="text-orange">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about studying abroad? Our expert counselors are
              here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-20"
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-navy flex items-center">
                    <MessageSquare className="h-6 w-6 mr-3 text-orange" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="mb-4 text-destructive text-center font-medium">
                      {error}
                    </div>
                  )}
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-navy font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="border-gray-300 focus:border-orange focus:ring-orange"
                          required
                        />
                      </div>

                      {/* Email and Phone Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-navy font-medium"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="border-gray-300 focus:border-orange focus:ring-orange"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-navy font-medium"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="border-gray-300 focus:border-orange focus:ring-orange"
                            required
                          />
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-navy font-medium"
                        >
                          Subject *
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            handleInputChange("subject", value)
                          }
                        >
                          <SelectTrigger className="border-gray-300 focus:border-orange focus:ring-orange">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-navy font-medium"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your study abroad goals and how we can help you..."
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="border-gray-300 focus:border-orange focus:ring-orange min-h-[120px]"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange hover:bg-orange/90 text-white py-3 text-lg"
                      >
                        {loading ? (
                          "Sending Message..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-navy mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Thank you for contacting us. Our team will get back to
                        you within 24 hours.
                      </p>
                      <p className="text-sm text-gray-500">
                        You can also reach us directly at{" "}
                        <a
                          href="mailto:info@studyabroadind.com"
                          className="text-orange hover:underline"
                        >
                          info@studyabroadind.com
                        </a>
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-full bg-gray-100 ${info.color}`}
                      >
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => {
                          if (info.icon === Mail && detail.includes("@")) {
                            return (
                              <a key={idx} href={`mailto:${detail}`} target="_blank" className="block text-sm text-gray-600 hover:text-orange transition-colors">
                                {detail}
                              </a>
                            );
                          }
                          if (info.icon === Phone && detail.startsWith("+")) {
                            return (
                              <a key={idx} href={`tel:${detail.replace(/[- ]/g, "")}`} target="_blank" className="block text-sm text-gray-600 hover:text-orange transition-colors">
                                {detail}
                              </a>
                            );
                          }
                          return (
                            <p key={idx} className="text-gray-600 text-sm">
                              {detail}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Quick Actions */}
            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-navy to-blue-900 text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4">
                    Need Immediate Help?
                  </h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-orange hover:bg-orange/90 justify-start">
                      <Phone className="h-4 w-4 mr-3" />
                      Schedule a Call
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-navy justify-start"
                    >
                      <Users className="h-4 w-4 mr-3" />
                      Book Consultation
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-navy justify-start"
                    >
                      <HeadphonesIcon className="h-4 w-4 mr-3" />
                      Live Chat Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* FAQ Link */}
            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-orange mx-auto mb-3" />
                  <h4 className="font-semibold text-navy mb-2">
                    Frequently Asked Questions
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Find quick answers to common questions about studying
                    abroad.
                  </p>
                  <Button
                    variant="outline"
                    className="border-navy text-navy hover:bg-navy hover:text-white"
                  >
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.62164634621!2d77.24580388885497!3d28.551090000000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3bbb01984e1%3A0x9ec3ec938b4ba853!2sLeverage%20Edu%20-%20Study%20Abroad%20Consultant%20in%20Nehru%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1750497828940!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
