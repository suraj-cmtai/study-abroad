import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Count {
  id: string;
  name: string;
  value: number;
  createdOn: string;
  updatedOn: string;
}

interface CountState {
  data: Count[];
  loading: boolean;
  error: string | null;
}

const initialState: CountState = {
  data: [],
  loading: false,
  error: null,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setCounts: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCounts, setLoading, setError } = countSlice.actions;

export const fetchCounts = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/api/routes/counts");
    if (response.status === 200) {
      dispatch(setCounts(response.data.data));
    } else {
      dispatch(setError(response.data.message));
    }
  } catch (error: unknown) {
    const message = typeof error === "object" && error && "message" in error ? (error as { message?: string }).message : String(error);
    dispatch(setError(message || "Unknown error"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const selectCounts = (state: RootState) => state.count.data;
export const selectLoading = (state: RootState) => state.count.loading;
export const selectError = (state: RootState) => state.count.error;

export default countSlice.reducer;
