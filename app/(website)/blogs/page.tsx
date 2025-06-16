"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, ArrowRight, Search, Clock } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const allBlogs = [
  {
    id: "1",
    title: "Top 10 Universities for International Students in 2024",
    slug: "top-universities-international-students-2024",
    excerpt:
      "Discover the best universities worldwide that offer exceptional programs and support for international students. From Ivy League institutions to emerging global leaders.",
    author: "Sarah Johnson",
    category: "Education",
    tags: ["Universities", "Rankings", "International"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-15T10:00:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
  {
    id: "2",
    title: "Student Visa Guide: Everything You Need to Know",
    slug: "student-visa-guide-complete",
    excerpt:
      "A comprehensive guide to obtaining student visas for popular study destinations including requirements, documentation, and expert tips for success.",
    author: "Michael Chen",
    category: "Visa",
    tags: ["Visa", "Documentation", "Guide"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-12T14:30:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
  {
    id: "3",
    title: "Scholarship Opportunities for Indian Students Abroad",
    slug: "scholarships-indian-students-abroad",
    excerpt:
      "Explore various scholarship programs available for Indian students planning to study abroad. Learn about eligibility criteria and application processes.",
    author: "Priya Sharma",
    category: "Scholarships",
    tags: ["Scholarships", "Funding", "Indian Students"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-10T09:15:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
  {
    id: "4",
    title: "Cost of Living: Studying in Canada vs Australia",
    slug: "cost-living-canada-australia-comparison",
    excerpt:
      "Compare the cost of living, tuition fees, and overall expenses for international students choosing between Canada and Australia.",
    author: "David Wilson",
    category: "Finance",
    tags: ["Cost of Living", "Canada", "Australia"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-08T16:45:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
  {
    id: "5",
    title: "IELTS vs TOEFL: Which Test Should You Take?",
    slug: "ielts-vs-toefl-comparison-guide",
    excerpt:
      "Understand the differences between IELTS and TOEFL exams to choose the right English proficiency test for your study abroad goals.",
    author: "Lisa Park",
    category: "Test Prep",
    tags: ["IELTS", "TOEFL", "English Tests"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-05T11:20:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
  {
    id: "6",
    title: "Cultural Adaptation: Tips for International Students",
    slug: "cultural-adaptation-international-students",
    excerpt:
      "Essential tips and strategies to help international students adapt to new cultures and make the most of their study abroad experience.",
    author: "Emma Rodriguez",
    category: "Student Life",
    tags: ["Culture", "Adaptation", "Student Tips"],
    image: "/placeholder.svg?height=200&width=400",
    createdOn: "2024-01-03T13:30:00Z",
    status: "published" as const,
    content: "Full blog content here...",
  },
]

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [...new Set(allBlogs.map((blog) => blog.category))]

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Study Abroad <span className="text-orange">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and guides for your international education journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredBlogs.length} of {allBlogs.length} articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />5 min read
                      </div>                      <Link href={`/blogs/${blog.slug}`}>                        <Button variant="ghost" className="text-navy hover:bg-orange hover:text-white transition-all duration-300 p-0">
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

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
