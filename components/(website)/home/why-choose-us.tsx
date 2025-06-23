"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { SectionContainer } from "@/components/ui/section-container"

const features = [
  {
    id: 1,
    title: 'Expert Counseling',
    description: 'Personalized guidance from experienced counselors who understand your goals',
    icon: '👥',
  },
  {
    id: 2,
    title: 'University Selection',
    description: 'Access to our network of top-ranked universities worldwide',
    icon: '🏛️',
  },
  {
    id: 3,
    title: 'Visa Assistance',
    description: 'Complete support for visa application and documentation',
    icon: '✈️',
  },
  {
    id: 4,
    title: 'Test Preparation',
    description: 'Comprehensive preparation for IELTS, TOEFL, GRE, and more',
    icon: '📝',
  },
  {
    id: 5,
    title: 'Financial Guidance',
    description: 'Assistance with scholarships, loans, and financial planning',
    icon: '💰',
  },
  {
    id: 6,
    title: 'Post-Landing Support',
    description: 'Continued support after you arrive at your destination',
    icon: '🌟',
  },
]

const WhyChooseUs = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <SectionContainer ref={containerRef} background="gray" className="py-20 overflow-hidden">
      <motion.div
        style={{ y: headerY }}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-navy mb-4">
          Why{" "}
          <span className="relative inline-block text-orange">
            Choose Us
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
          We provide comprehensive support throughout your study abroad journey, ensuring you have everything you need
          to succeed.
          </p>
        </motion.div>

      <motion.div
        style={{ y: gridY }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {features.map(feature => (
            <motion.div
              key={feature.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow group">
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-orange transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    </SectionContainer>
  )
}

export default WhyChooseUs
