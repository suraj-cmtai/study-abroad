"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Globe, Award, TrendingUp, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const features = [
  {
    icon: CheckCircle,
    title: "Hassle-Free Admission",
    description: "Streamlined application process with expert guidance",
    color: "text-emerald-500"
  },
  {
    icon: Users,
    title: "Expert Counselors",
    description: "Dedicated support from experienced education consultants",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Partnerships with top universities worldwide",
    color: "text-purple-500"
  },
  {
    icon: Award,
    title: "Success Guarantee",
    description: "Proven track record of successful placements",
    color: "text-orange"
  },
]

const stats = [
  { number: "5000+", label: "Students Placed", icon: Users },
  { number: "98%", label: "Success Rate", icon: TrendingUp },
  { number: "200+", label: "Universities", icon: Globe },
  { number: "4.9★", label: "Rating", icon: Star },
]

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const floatingAnimation = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  const imageBreathingAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  return (
    <section id="about-section" className="w-full pt-10 pb-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 bg-orange/10 rounded-full"
              >
                <span className="text-orange font-medium text-sm">✨ Your Global Education Partner</span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-navy leading-tight"
              >
                Why Choose{" "}
                <motion.span 
                  className="text-orange relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Study Abroad?
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange to-orange/60 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.span>
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-600 leading-relaxed max-w-xl"
              >
                We are your trusted partner in achieving international education dreams. With years of experience and a
                commitment to excellence, we guide students through every step of their study abroad journey.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: true }}
                  className="group p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-transparent hover:border-gray-200/50 transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-shadow`}
                    >
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-navy group-hover:text-orange transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, rotateY: 25 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              animate={imageBreathingAnimation}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-navy/5 to-orange/5"
            >
              {/* Option 1: Using Next.js Image with student.jpg */}
              <Image
                src="/images/student.jpg"
                alt="Students studying abroad"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover"
                priority
              />

              {/* Alternative Option 2: For future GIF/Video support */}
              {/* 
              <div className="w-full h-[500px] bg-gradient-to-br from-navy/10 to-orange/10 flex items-center justify-center">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/students.mp4" type="video/mp4" />
                </video>
              </div>
              */}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <motion.div
                animate={floatingAnimation}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              >
                <Globe className="h-6 w-6 text-orange" />
              </motion.div>

              <motion.div
                animate={{
                  ...floatingAnimation,
                  transition: { ...floatingAnimation.transition, delay: 1 }
                }}
                className="absolute bottom-20 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              >
                <Award className="h-6 w-6 text-navy" />
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-6 grid grid-cols-2 gap-3"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex justify-center mb-2"
                        >
                          <stat.icon className="h-5 w-5 text-orange" />
                        </motion.div>
                        <motion.div 
                          className="text-2xl font-bold text-navy group-hover:text-orange transition-colors"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {stat.number}
                        </motion.div>
                        <div className="text-xs text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional floating stat */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Card className="bg-gradient-to-br from-orange to-orange/80 text-white shadow-xl border-0">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-xl font-bold">25+</div>
                      <div className="text-xs opacity-90">Countries</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}