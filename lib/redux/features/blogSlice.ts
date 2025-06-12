import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { getErrorMessage } from "@/lib/utils";

// 1. Updated interface to match the API
interface Blog {
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
  createdOn: string; // Assuming these are ISO date strings
  updatedOn: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  selectedBlog: Blog | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  selectedBlog: null,
};

// 2. createAsyncThunk for fetching all blogs
export const fetchBlogs = createAsyncThunk<Blog[]>(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/routes/blogs");
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 3. createAsyncThunk for creating a new blog (handles FormData)
export const createBlog = createAsyncThunk<Blog, FormData>(
  "blog/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      // Axios will automatically set the correct Content-Type for FormData
      const response = await axios.post("/api/routes/blogs", blogData);
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 4. createAsyncThunk for updating a blog (handles FormData)
export const updateBlog = createAsyncThunk<Blog, { id: string; data: FormData }>(
  "blog/updateBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/routes/blogs/${id}`, data);
      return response.data.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// 5. createAsyncThunk for deleting a blog
export const deleteBlog = createAsyncThunk<string, string>(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/routes/blogs/${id}`);
      return id; // Return the id on success for the reducer
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Reducers for synchronous actions if any are needed
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
  // 6. Use extraReducers to handle async thunk lifecycle
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.blogs.unshift(action.payload); // Add new blog to the beginning
        state.loading = false;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<Blog>) => {
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<string>) => {
        // action.payload here is the blog ID
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedBlog } = blogSlice.actions;

// Selectors
export const selectBlogs = (state: RootState) => state.blog.blogs;
export const selectBlogLoading = (state: RootState) => state.blog.loading;
export const selectBlogError = (state: RootState) => state.blog.error;
export const selectSelectedBlog = (state: RootState) => state.blog.selectedBlog;

export default blogSlice.reducer;