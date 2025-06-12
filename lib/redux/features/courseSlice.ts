import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { getErrorMessage } from "@/lib/utils";

// Define interfaces
interface Course {
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
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  selectedCourse: Course | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  selectedCourse: null,
};

// Fetch all courses
export const fetchCourses = createAsyncThunk<Course[]>(
  "course/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/routes/course");
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Create a new course
export const createCourse = createAsyncThunk<Course, FormData>(
  "course/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/routes/course", courseData);
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Update a course
export const updateCourse = createAsyncThunk<Course, { id: string; data: FormData }>(
  "course/updateCourse",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/routes/course/${id}`, data);
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Delete a course
export const deleteCourse = createAsyncThunk<string, string>(
  "course/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/routes/course/${id}`);
      return id;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.courses.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
        state.courses = state.courses.filter(course => course.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedCourse } = courseSlice.actions;

// Selectors
export const selectCourses = (state: RootState) => state.course.courses;
export const selectCourseLoading = (state: RootState) => state.course.loading;
export const selectCourseError = (state: RootState) => state.course.error;
export const selectSelectedCourse = (state: RootState) => state.course.selectedCourse;

export default courseSlice.reducer;