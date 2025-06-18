"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const featuredImages = [
  {
    id: "1",
    title: "Campus Life at Oxford University",
    image: "/placeholder.svg?height=300&width=400",
    createdOn: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Student Graduation Ceremony",
    image: "/placeholder.svg?height=400&width=300",
    createdOn: "2024-01-12T14:30:00Z",
  },
  {
    id: "3",
    title: "International Student Orientation",
    image: "/placeholder.svg?height=250&width=350",
    createdOn: "2024-01-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Study Group Session",
    image: "/placeholder.svg?height=350&width=300",
    createdOn: "2024-01-08T16:45:00Z",
  },
]

export function GalleryPreview() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Student <span className="text-orange">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a glimpse into the vibrant student life and memorable moments from our study abroad programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl shadow-lg card-hover cursor-pointer ${
                index === 1 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={image.image || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover min-h-[250px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8">
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
