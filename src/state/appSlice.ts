import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppConfig = {
  initialised: boolean;
};

const initialState: AppConfig = {
  initialised: false,
};

const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setInit(state, action: PayloadAction<boolean>) {
      state.initialised = action.payload;
    },
  },
});
export const { setInit } = appSlice.actions;
export default appSlice.reducer;

export const selectInit = (s: any) => s.app.initialised;
