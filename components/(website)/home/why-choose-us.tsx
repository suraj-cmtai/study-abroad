import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

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
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#004672] mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive support throughout your study abroad journey,
            ensuring you have everything you need to succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#004672] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
