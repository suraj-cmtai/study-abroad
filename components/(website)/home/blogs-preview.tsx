"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const featuredBlogs = [
  {
    id: "1",
    title: "Top 10 Universities for International Students in 2024",
    slug: "top-universities-international-students-2024",
    excerpt:
      "Discover the best universities worldwide that offer exceptional programs and support for international students.",
    author: "Sarah Johnson",
    category: "Education",
    tags: ["Universities", "Rankings", "International"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Student Visa Guide: Everything You Need to Know",
    slug: "student-visa-guide-complete",
    excerpt:
      "A comprehensive guide to obtaining student visas for popular study destinations including requirements and tips.",
    author: "Michael Chen",
    category: "Visa",
    tags: ["Visa", "Documentation", "Guide"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-12T14:30:00Z",
  },
  {
    id: "3",
    title: "Scholarship Opportunities for Indian Students Abroad",
    slug: "scholarships-indian-students-abroad",
    excerpt: "Explore various scholarship programs available for Indian students planning to study abroad.",
    author: "Priya Sharma",
    category: "Scholarships",
    tags: ["Scholarships", "Funding", "Indian Students"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-10T09:15:00Z",
  },
]

export function BlogsPreview() {
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
            Latest <span className="text-orange">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and guides for studying abroad from our expert team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full card-hover overflow-hidden">
                <div className="relative">
                  <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-navy text-white">{blog.category}</Badge>
                </div>

                <CardHeader className="space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(blog.createdOn).toLocaleDateString('en-GB')}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {blog.author}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy line-clamp-2 hover:text-orange transition-colors">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <Link href={`/blogs/${blog.slug}`}>                      <Button variant="ghost" className="text-navy hover:bg-orange hover:text-white transition-all duration-300 p-0">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
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
          <Link href="/blogs">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8">
              View All Blogs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
