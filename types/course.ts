export interface Course {
  id: string
  title: string
  description: string
  image?: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  duration: string
  instructor: string
  enrollmentCount: number
  learningHours?: string
  modeOfDelivery?: 'Online' | 'On-campus' | 'Hybrid' | 'Self-paced'
  modeOfAssessment?: string
  price: number
  status: 'Active' | 'Inactive'
}
