import { HeroSection } from "@/components/(website)/home/hero-section"
import { AboutSection } from "@/components/(website)/home/about-section"
import { CourseTypesSection } from "@/components/(website)/home/course-types-section"
import { CoursesPreview } from "@/components/(website)/home/courses-preview"
import { BlogsPreview } from "@/components/(website)/home/blogs-preview"
import { GalleryPreview } from "@/components/(website)/home/gallery-preview"
import { TestimonialsSection } from "@/components/(website)/home/testimonials-section"
import { NewsletterSection } from "@/components/(website)/home/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <CourseTypesSection />
      <CoursesPreview />
      <BlogsPreview />
      <GalleryPreview />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
