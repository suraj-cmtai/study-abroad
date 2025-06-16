"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Clock, Share2, BookmarkPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const blogPost = {
  id: "1",
  title: "Top 10 Universities for International Students in 2024",
  slug: "top-universities-international-students-2024",
  content: `
    <p>Choosing the right university for your international education is one of the most important decisions you'll make. With thousands of institutions worldwide, it can be overwhelming to narrow down your options. This comprehensive guide highlights the top 10 universities that consistently rank high for international student satisfaction, academic excellence, and career prospects.</p>

    <h2>1. Harvard University, USA</h2>
    <p>Harvard University continues to be a top choice for international students seeking world-class education. With its prestigious reputation, extensive alumni network, and cutting-edge research facilities, Harvard offers unparalleled opportunities across various disciplines.</p>

    <h3>Key Highlights:</h3>
    <ul>
      <li>Over 20,000 students from 100+ countries</li>
      <li>Need-blind admissions for international students</li>
      <li>Extensive financial aid programs</li>
      <li>Strong career placement rates</li>
    </ul>

    <h2>2. University of Oxford, UK</h2>
    <p>The University of Oxford, with its rich history dating back to the 12th century, offers a unique collegiate system and tutorial-based learning approach that attracts students from around the globe.</p>

    <h3>Key Highlights:</h3>
    <ul>
      <li>Tutorial system providing personalized attention</li>
      <li>38 colleges offering diverse communities</li>
      <li>Strong research opportunities</li>
      <li>Excellent graduate employment rates</li>
    </ul>

    <h2>3. Stanford University, USA</h2>
    <p>Located in the heart of Silicon Valley, Stanford University is renowned for its innovation, entrepreneurship, and technology programs. The university's close ties to the tech industry provide unique opportunities for students.</p>

    <h2>4. University of Cambridge, UK</h2>
    <p>Cambridge University's academic excellence and research contributions have made it a preferred destination for international students seeking rigorous academic challenges and intellectual growth.</p>

    <h2>5. Massachusetts Institute of Technology (MIT), USA</h2>
    <p>MIT's focus on science, technology, engineering, and mathematics makes it an ideal choice for students passionate about innovation and problem-solving.</p>

    <h2>Application Tips for International Students</h2>
    <p>When applying to these prestigious institutions, consider the following:</p>
    <ul>
      <li>Start your application process early</li>
      <li>Focus on academic excellence and standardized test scores</li>
      <li>Demonstrate leadership and extracurricular involvement</li>
      <li>Write compelling personal statements</li>
      <li>Secure strong letters of recommendation</li>
    </ul>

    <h2>Conclusion</h2>
    <p>These universities represent the pinnacle of higher education and offer exceptional opportunities for international students. While admission is competitive, the investment in your education at these institutions can provide lifelong benefits and open doors to global career opportunities.</p>
  `,
  author: "Sarah Johnson",
  category: "Education",
  tags: ["Universities", "Rankings", "International", "Study Abroad"],
  excerpt:
    "Discover the best universities worldwide that offer exceptional programs and support for international students. From Ivy League institutions to emerging global leaders.",
  image: "/placeholder.svg?height=400&width=800",
  createdOn: "2024-01-15T10:00:00Z",
  updatedOn: "2024-01-15T10:00:00Z",
  status: "published" as const,
}

const relatedPosts = [
  {
    id: "2",
    title: "Student Visa Guide: Everything You Need to Know",
    slug: "student-visa-guide-complete",
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: "3",
    title: "Scholarship Opportunities for Indian Students",
    slug: "scholarships-indian-students-abroad",
    image: "/placeholder.svg?height=150&width=200",
  },
]

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <img src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-4xl"
            >
              <Link href="/blogs" className="inline-flex items-center text-gray-300 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Link>

              <Badge className="bg-orange text-white mb-4">{blogPost.category}</Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{blogPost.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {blogPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(blogPost.createdOn).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />8 min read
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-navy prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-navy"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <Separator className="my-8" />
              <div className="flex flex-wrap gap-2 mb-6">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-navy border-navy">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={blogPost.author} />
                    <AvatarFallback>
                      {blogPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-navy">{blogPost.author}</div>
                    <div className="text-sm text-gray-600">Education Consultant</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </motion.article>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-navy mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className="group">
                    <div className="flex space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-semibold text-navy group-hover:text-orange transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h4 className="text-xl font-bold text-navy mb-4">Stay Updated</h4>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest study abroad insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                />
                <Button className="w-full bg-orange hover:bg-orange/90">Subscribe</Button>
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h4 className="text-xl font-bold text-navy mb-4">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {["Study Abroad", "Scholarships", "Visa Guide", "Universities", "IELTS", "Student Life"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange hover:text-white hover:border-orange"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
