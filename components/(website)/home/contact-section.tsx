"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const ContactSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leftColY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const rightColY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section ref={containerRef} className="w-full py-20 bg-gray-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">
            Get in{" "}
            <span className="relative inline-block text-orange">
              Touch
              <motion.div
                className="absolute -bottom-1 left-0 h-1 w-full bg-orange/50 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about studying abroad? We're here to help you every step of the way
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            style={{ y: leftColY }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 transition-shadow hover:shadow-xl">
              <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange" />
                <div>
                    <h3 className="font-semibold text-navy mb-2">Email Us</h3>
                  <p className="text-gray-600">info@studyabroad.com</p>
                  <p className="text-gray-600">admissions@studyabroad.com</p>
                </div>
              </div>
            </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 transition-shadow hover:shadow-xl">
              <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange" />
                <div>
                    <h3 className="font-semibold text-navy mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>
            </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 transition-shadow hover:shadow-xl">
              <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange" />
                <div>
                    <h3 className="font-semibold text-navy mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Education Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            style={{ y: rightColY }}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="p-6">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input placeholder="Enter your phone number" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea placeholder="Tell us about your study abroad plans" className="h-32" />
                </div>

                <Button className="w-full bg-orange hover:bg-orange/90 text-white group">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
