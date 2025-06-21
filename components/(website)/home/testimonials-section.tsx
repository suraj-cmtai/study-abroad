"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useRef } from "react"

const testimonials = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "MBA Graduate",
    university: "Harvard Business School",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Study Abroad made my dream of studying at Harvard a reality. Their guidance throughout the application process was invaluable.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Computer Science Student",
    university: "MIT",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The support I received was exceptional. From visa assistance to accommodation, they handled everything professionally.",
    rating: 5,
  },
  {
    id: "3",
    name: "Arjun Kumar",
    role: "Engineering Graduate",
    university: "Stanford University",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Thanks to their scholarship guidance, I was able to secure funding for my Master's program. Highly recommended!",
    rating: 5,
  },
]

export function TestimonialsSection() {
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
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
  return (
    <section ref={containerRef} className="w-full py-20 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          style={{ y: headerY }}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Student{" "}
            <span className="relative inline-block text-orange">
              Success Stories
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
            Hear from our successful students who achieved their dreams of studying abroad with our guidance and
            support.
          </p>
        </motion.div>

        <motion.div
          style={{ y: gridY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="h-full"
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full card-hover relative">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-orange mb-4" />

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-navy">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-orange font-medium">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
