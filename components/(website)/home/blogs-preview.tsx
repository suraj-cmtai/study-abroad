"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import {
  fetchPublishedBlogs,
  selectPublishedBlogs,
  selectBlogLoading,
  selectBlogError,
  selectHasFetchedBlogs,
} from "@/lib/redux/features/blogSlice"

export function BlogsPreview() {
  const dispatch = useDispatch<AppDispatch>()
  const blogs = useSelector(selectPublishedBlogs)
  const loading = useSelector(selectBlogLoading)
  const error = useSelector(selectBlogError)
  const hasFetched = useSelector(selectHasFetchedBlogs)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchPublishedBlogs())
    }
  }, [dispatch, hasFetched])

  // Sort by createdOn desc and take only 3
  const latestBlogs = blogs
    .slice()
    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
    .slice(0, 3)

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Latest{" "}
            <span className="relative inline-block text-orange">
              Insights
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
            Stay updated with the latest trends, tips, and guides for studying abroad from our expert team.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mb-12">{error}</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {latestBlogs.map(blog => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                className="h-full"
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full card-hover overflow-hidden">
                  <div
                    className="relative h-48"
                    style={{
                      backgroundImage: `url('/placeholder.svg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
                      {blog.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <Link href={`/blogs/${blog.slug}`}>
                        <Button
                          variant="ghost"
                          className="group text-navy hover:bg-transparent p-0 transition-colors duration-300"
                        >
                          <span className="group-hover:text-orange">Read More</span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:text-orange transition-all duration-300 group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/blogs">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8 group">
              View All Blogs
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
