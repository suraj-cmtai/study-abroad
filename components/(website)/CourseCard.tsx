"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award } from "lucide-react";

interface CourseProps {
  course: {
    id: string;
    title: string;
    category: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: number;
    status: 'Active' | 'Draft' | 'Archived';
    description: string;
    instructor: string;
    enrollmentCount: number;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

const CourseCard = ({ course }: CourseProps) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/courses/${course.id}`}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative h-48 w-full">
            <Image
              src={course.image || "/course-placeholder.jpg"}
              alt={course.title}
              fill
              className="object-cover"
            />
            <Badge 
              className={`absolute top-4 right-4 ${levelColors[course.level]}`}
              variant="secondary"
            >
              {course.level}
            </Badge>
          </div>
          
          <CardHeader>
            <Badge variant="outline" className="w-fit mb-2">
              {course.category}
            </Badge>
            <CardTitle className="line-clamp-2 text-[#004672] hover:text-[#F78E40]">
              {course.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.enrollmentCount} enrolled
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                Certificate
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
