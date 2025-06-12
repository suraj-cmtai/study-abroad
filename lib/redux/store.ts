import { configureStore } from '@reduxjs/toolkit'
import galleryReducer from "./features/gallerySlice";
import leadReducer from "./features/leadSlice";
import locationReducer from "./features/locationSlice";
import packageReducer from "./features/packageSlice";
import testimonialReducer from "./features/testimonialSlice";
import planReducer from "./features/planSlice";
import authReducer from "./features/authSlice";
import countReducer from "./features/countSlice";
import userReducer from "./features/userSlice";
import blogReducer from "./features/blogSlice";
import courseReducer from "./features/courseSlice";
import subscriberReducer from "./features/subscriberSlice";
import contactReducer from "./features/contactSlice";


export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    lead: leadReducer,
    location: locationReducer,
    package: packageReducer,
    testimonial: testimonialReducer,
    plan: planReducer,
    auth: authReducer,
    count: countReducer,
    user: userReducer,
    blog: blogReducer,
    course: courseReducer,    subscriber: subscriberReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;