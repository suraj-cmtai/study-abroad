"use client"

import { use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Clock, Share2, BookmarkPlus, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AppDispatch } from "@/lib/redux/store"
import {
  fetchBlogBySlug,
  fetchBlogs,
  selectCurrentBlog,
  selectBlogs,
  selectBlogLoading,
  selectBlogError,
  clearCurrentBlog,
  selectHasFetchedBlogBySlug
} from "@/lib/redux/features/blogSlice"
import {
  createSubscriber,
  selectSubscriberLoading,
  selectSubscriberError,
} from "@/lib/redux/features/subscriberSlice"
import Loading from "./loading"
import NotFound from "./not-found"

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const dispatch = useDispatch<AppDispatch>()
  const currentBlog = useSelector(selectCurrentBlog)
  const allBlogs = useSelector(selectBlogs)
  const hasFetchedBlogBySlug = useSelector(selectHasFetchedBlogBySlug)
  const error = useSelector(selectBlogError)
  const [subscriberEmail, setSubscriberEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const subscriberLoading = useSelector(selectSubscriberLoading)
  const subscriberError = useSelector(selectSubscriberError)

  useEffect(() => {
    const loadBlog = async () => {
      const resolvedParams = await params
      dispatch(fetchBlogBySlug(resolvedParams.slug))
      
      // Also fetch all blogs if not already loaded for related posts
      if (allBlogs.length === 0) {
        dispatch(fetchBlogs())
      }
    }

    loadBlog()

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentBlog())
    }
  }, [dispatch, params, allBlogs.length])

  // Get related posts (same category, excluding current post)
  const relatedPosts = currentBlog
    ? allBlogs
        .filter(blog => 
          blog.id !== currentBlog.id && 
          blog.category === currentBlog.category && 
          blog.status === 'published'
        )
        .slice(0, 2)
    : []

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subscriberEmail) return
    const data = new FormData()
    data.append("email", subscriberEmail)
    data.append("source", "blog-sidebar")
    try {
      await dispatch(createSubscriber(data)).unwrap()
      setIsSubscribed(true)
      setSubscriberEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    } catch (err) {
      // error handled by redux
    }
  }

  // Show loading.tsx while loading
  if (!hasFetchedBlogBySlug) return <Loading />

  // // Handle blog not found error
  if (error?.includes("Blog not found")) {
    return notFound()
  }

  // Handle other errors
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-2">Error Loading Article</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/blogs">
            <Button className="bg-orange hover:bg-orange/90">
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    )
  }
 // If currentBlog is still null at this point, show loading
  if (!currentBlog) {
    return <Loading />
  }

  if (hasFetchedBlogBySlug && !currentBlog && error) {
   
    return (
      <NotFound />
    )
  }
 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full relative">
        <div
          className="relative h-96 overflow-hidden"
          style={{
            backgroundImage: `url('/placeholder.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Image
            src={currentBlog.image || "/placeholder.svg?height=400&width=800"} 
            alt={currentBlog.title} 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/70"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4">
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

              {currentBlog.category && (
                <Badge className="bg-orange text-white mb-4">{currentBlog.category}</Badge>
              )}

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{currentBlog.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {currentBlog.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(currentBlog.createdOn).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {calculateReadTime(currentBlog.content)} min read
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
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />

              {/* Tags */}
              {currentBlog.tags.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentBlog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-navy border-navy">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </>
              )}

              {/* Author Info */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={currentBlog.author} />
                    <AvatarFallback>
                      {currentBlog.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-navy">{currentBlog.author}</div>
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
            {relatedPosts.length > 0 && (
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
                        <div
                          className="relative w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden"
                          style={{
                            backgroundImage: `url('/placeholder.svg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <Image
                            src={post.image || "/placeholder.svg?height=150&width=200"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
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
            )}
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
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    required
                  />
                  <Button type="submit" className="w-full bg-orange hover:bg-orange/90" disabled={subscriberLoading}>
                    {subscriberLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                  {subscriberError && <div className="text-red-500 text-sm">{subscriberError}</div>}
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <div className="font-semibold text-navy mb-1">Successfully Subscribed!</div>
                  <div className="text-gray-500 text-sm">Thank you for subscribing. You'll receive our latest updates soon.</div>
                </div>
              )}
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