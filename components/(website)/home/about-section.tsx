"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Globe, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: CheckCircle,
    title: "Hassle-Free Admission",
    description: "Streamlined application process with expert guidance",
  },
  {
    icon: Users,
    title: "Expert Counselors",
    description: "Dedicated support from experienced education consultants",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Partnerships with top universities worldwide",
  },
  {
    icon: Award,
    title: "Success Guarantee",
    description: "Proven track record of successful placements",
  },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Why Choose <span className="text-orange">Study Abroad?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We are your trusted partner in achieving international education dreams. With years of experience and a
              commitment to excellence, we guide students through every step of their study abroad journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <feature.icon className="h-6 w-6 text-orange mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Students studying abroad"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6"
            >
              <Card className="bg-white shadow-xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-navy">5000+</div>
                    <div className="text-sm text-gray-600">Students Placed</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
