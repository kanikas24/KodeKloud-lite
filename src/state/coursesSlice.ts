import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CourseDisplay = {
  id: string;
  slug: string;
  title: string;
  author: string;
  thumbnail: string;
};

type CourseState = {
  items: CourseDisplay[];
  next?: number;
  loading: boolean;
  error: string | null;
};

const initialState: CourseState = {
  items: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    setPage(
      state,
      action: PayloadAction<{
        items: CourseDisplay[];
        next: number;
        append?: boolean;
      }>
    ) {
      const { items, next, append } = action.payload;
      state.items = append ? [...state.items, ...items] : items;
      state.next = next;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.loading = false;
      state.error = action.payload ?? "Failed to load courses";
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { setLoading, setPage, setError, reset } = coursesSlice.actions;
export default coursesSlice.reducer;

export const selectCourse = (s: any) => s.courses.items as CourseDisplay[];
export const selectDisplayLoading = (s: any) => s.courses.loading as boolean;
export const selectCourseError = (s: any) =>
  s.courses.error as string | null | undefined;
export const selectNextPage = (s: any) => s.courses.next as number | undefined;
