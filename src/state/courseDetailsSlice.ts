import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseDetails } from "../data/requests/requests";

type DetailsState = {
  keyword: Record<string, CourseDetails>;
  loading: boolean;
  error?: string | null;
};

const initialState: DetailsState = {
  keyword: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "courseDetails",
  initialState,
  reducers: {
    detailsLoader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      if (action.payload) state.error = null;
    },
    detailsData(
      state,
      action: PayloadAction<{ keyword: string; data: CourseDetails }>
    ) {
      state.keyword[action.payload.keyword] = action.payload.data;
      state.loading = false;
    },
    detailsError(state, action: PayloadAction<string | undefined>) {
      state.loading = false;
      state.error = action.payload ?? "Failed to load course details";
    },
  },
});
export const { detailsLoader, detailsData, detailsError } = slice.actions;
export default slice.reducer;

export const selectDetails = (s: any, keyword: string) =>
  s.courseDetails.keyword[keyword];
export const selectDetailsLoading = (s: any) =>
  s.courseDetails.loading as boolean;
export const selectDetailsError = (s: any) =>
  s.courseDetails.error as string | null | undefined;
