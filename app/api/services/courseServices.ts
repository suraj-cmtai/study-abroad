import { db } from "../config/firebase";
import consoleManager from "../utils/consoleManager";
import admin from "firebase-admin";

export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced"
}

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: CourseLevel;
  price: number;
  status: CourseStatus;
  description: string;
  instructor: string;
  enrollmentCount: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Course Services
class CourseService {
  static courses: Course[] = [];
  static isInitialized = false;

  // Helper method to convert Firestore timestamp to Date
  private static convertTimestamp(timestamp: any): Date {
    if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000);
    }
    return timestamp instanceof Date ? timestamp : new Date(timestamp);
  }

  // Helper method to convert document data to Course type
  private static convertToType(id: string, data: any): Course {
    return {
      id,
      title: data.title || "",
      category: data.category || "",
      duration: data.duration || "",
      level: data.level as CourseLevel,
      price: Number(data.price || 0),
      status: data.status as CourseStatus,
      description: data.description || "",
      instructor: data.instructor || "",
      enrollmentCount: Number(data.enrollmentCount || 0),
      image: data.image || null,
      createdAt: this.convertTimestamp(data.createdAt),
      updatedAt: this.convertTimestamp(data.updatedAt),
    };
  }

  // Initialize Firestore real-time listener
  static initCourses() {
    if (this.isInitialized) return;

    consoleManager.log("Initializing Firestore listener for courses...");
    const coursesCollection = db.collection("courses");

    coursesCollection.onSnapshot((snapshot: any) => {
      this.courses = snapshot.docs.map((doc: any) => {
        return this.convertToType(doc.id, doc.data());
      });
      consoleManager.log(
        "Firestore Read: Courses updated, count:",
        this.courses.length
      );
    });

    this.isInitialized = true;
  }

  // Get all courses
  static async getAllCourses(forceRefresh = false) {
    if (forceRefresh || !this.isInitialized) {
      consoleManager.log("Force refreshing courses from Firestore...");
      const snapshot = await db
        .collection("courses")
        .orderBy("createdAt", "desc")
        .get();
      this.courses = snapshot.docs.map((doc: any) => {
        return this.convertToType(doc.id, doc.data());
      });
      this.isInitialized = true;
    } else {
      consoleManager.log("Returning cached courses. No Firestore read.");
    }
    return this.courses;
  }

  // Add a new course
  static async addCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      const newCourseRef = await db.collection("courses").add({
        ...courseData,
        enrollmentCount: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      consoleManager.log("New course added with ID:", newCourseRef.id);

      await this.getAllCourses(true);
      return { id: newCourseRef.id, ...courseData,createdAt: timestamp, updatedAt: timestamp };
    } catch (error: any) {
      consoleManager.error("Error adding new course:", error);
      throw error;
    }
  }

  // Get a course by ID
  static async getCourseById(id: string) {
    try {
      const course = this.courses.find((course) => course.id === id);
      if (course) {
        consoleManager.log(`Course found in cache:`, id);
        return course;
      }

      const courseDoc = await db.collection("courses").doc(id).get();
      
      if (!courseDoc.exists) {
        consoleManager.error(`Course with ID ${id} not found in Firestore.`);
        throw new Error("Course not found");
      }

      const courseData = this.convertToType(courseDoc.id, courseDoc.data());
      consoleManager.log(`Course fetched from Firestore:`, id);
      return courseData;
    } catch (error) {
      consoleManager.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  }

  // Update a course by ID
  static async updateCourse(id: string, updateData: Partial<Course>) {
    try {
      const timestamp = admin.firestore.FieldValue.serverTimestamp();
      const courseRef = db.collection("courses").doc(id);
      await courseRef.update({
        ...updateData,
        updatedAt: timestamp,
      });

      consoleManager.log("Course updated successfully:", id);
      await this.getAllCourses(true);
      
      const updatedCourse = await this.getCourseById(id);
      return updatedCourse;
    } catch (error: any) {
      consoleManager.error("Error updating course:", error);
      throw error;
    }
  }

  // Delete a course by ID
  static async deleteCourse(id: string) {
    try {
      const courseRef = db.collection("courses").doc(id);
      await courseRef.delete();

      consoleManager.log("Course deleted successfully:", id);
      await this.getAllCourses(true);
      return { id };
    } catch (error: any) {
      consoleManager.error("Error deleting course:", error);
      throw error;
    }
  }

  // Update enrollment count
  static async updateEnrollmentCount(id: string, increment: boolean = true) {
    try {
      const courseRef = db.collection("courses").doc(id);
      const incrementValue = increment ? 1 : -1;
      
      await courseRef.update({
        enrollmentCount: admin.firestore.FieldValue.increment(incrementValue),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      consoleManager.log(`Course enrollment ${increment ? 'increased' : 'decreased'} for:`, id);
      await this.getAllCourses(true);
      return { success: true };
    } catch (error: any) {
      consoleManager.error("Error updating course enrollment:", error);
      throw error;
    }
  }

  // Get courses by category
  static async getCoursesByCategory(category: string) {
    return this.courses.filter(course => course.category === category);
  }

  // Get courses by level
  static async getCoursesByLevel(level: CourseLevel) {
    return this.courses.filter(course => course.level === level);
  }

  // Get courses by instructor
  static async getCoursesByInstructor(instructor: string) {
    return this.courses.filter(course => course.instructor === instructor);
  }

  // Get published courses
  static async getPublishedCourses() {
    return this.courses.filter(course => course.status === CourseStatus.PUBLISHED);
  }

  // Search courses
  static async searchCourses(query: string) {
    const searchTerm = query.toLowerCase();
    return this.courses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm)
    );
  }
}

export default CourseService;