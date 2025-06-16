export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  author: string
  category: string | null
  tags: string[]
  excerpt: string | null
  status: "draft" | "published"
  image: string | null
  createdOn: string
  updatedOn: string
}

export interface Course {
  id: string
  title: string
  category: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  price: number
  status: "Active" | "Draft" | "Archived"
  description: string
  instructor: string
  enrollmentCount: number
  image: string | null
  createdAt: string
  updatedAt: string
  learningHours?: string
  modeOfDelivery?: string
  modeOfAssessment?: string
}

export interface GalleryItem {
  id: string
  title: string
  image: string
  createdOn: string
  updatedOn: string
}
