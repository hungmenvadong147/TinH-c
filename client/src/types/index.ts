export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  bio?: string;
  enrolledCourses: string[];
  createdCourses: string[];
  progress: Progress[];
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  introVideo?: string;
  price: number;
  isFree: boolean;
  instructor: User;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  enrolledStudents: string[];
  rating: number;
  reviewCount: number;
  duration: number;
  language: string;
  requirements: string[];
  whatYouWillLearn: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  content: string;
  order: number;
  course: string;
  isFree: boolean;
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'video' | 'link' | 'other';
}

export interface Review {
  _id: string;
  course: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  courseId: string;
  completedLessons: string[];
  progressPercentage: number;
}

export interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  user: User;
  course?: Course;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}
