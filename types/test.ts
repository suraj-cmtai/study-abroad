export interface TestAnswer {
  questionId: number;
  answer: string;
  timeSpent: number;
  category: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  skills: string[];
  educationPath: string[];
  image?: string;
  link?: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

export type TestPhase = 'welcome' | 'testing' | 'results'; 