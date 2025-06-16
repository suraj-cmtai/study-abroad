"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

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
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Student <span className="text-orange">Success Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our successful students who achieved their dreams of studying abroad with our guidance and
            support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                          .map((n) => n[0])
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
        </div>
      </div>
    </section>
  )
}
