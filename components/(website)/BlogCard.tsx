"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface BlogProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    content: string;
    author: string;
    category: string | null;
    tags: string[];
    excerpt: string | null;
    status: 'draft' | 'published';
    image: string | null;
    createdOn: string;
    updatedOn: string;
  };
}

const BlogCard = ({ blog }: BlogProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/blogs/${blog.slug}`}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative h-48 w-full">
            <Image
              src={blog.image || "/blog-placeholder.jpg"}
              alt={blog.title}
              fill
              className="object-cover"
            />
            {blog.category && (
              <Badge 
                className="absolute top-4 right-4 bg-white/90 text-[#004672]"
                variant="secondary"
              >
                {blog.category}
              </Badge>
            )}
          </div>
          
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {blog.author}
              </div>
              <span>•</span>
              <time>
                {formatDistanceToNow(new Date(blog.createdOn), { addSuffix: true })}
              </time>
            </div>
            <CardTitle className="line-clamp-2 text-[#004672] hover:text-[#F78E40]">
              {blog.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {blog.excerpt || blog.content}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
