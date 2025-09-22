import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VideoPlaybackState = {
  position: Record<string, number>;
  progressStatus: Record<string, Record<string, Record<string, boolean>>>;
};

const initial: VideoPlaybackState = { position: {}, progressStatus: {} };

const slice = createSlice({
  name: "playback",
  initialState: initial,
  reducers: {
    setPosition(state, a: PayloadAction<{ id: string; seconds: number }>) {
      const { id, seconds } = a.payload;
      state.position[id] = seconds;
    },
    setProgressForId(
      state,
      a: PayloadAction<{
        keyword: string;
        module: string;
        lesson: string;
        status: boolean;
      }>
    ) {
      const { keyword, module, lesson, status } = a.payload;
      if (!state.progressStatus[keyword]) {
        state.progressStatus[keyword] = {};
      }

      if (!state.progressStatus[keyword][module]) {
        state.progressStatus[keyword][module] = {};
      }

      state.progressStatus[keyword][module][lesson] = status;
    },
  },
});

export const { setPosition, setProgressForId } = slice.actions;
export default slice.reducer;

export const selectPosition = (s: any) => s.playback.position ?? {};
export const selectProgressStatus = (s: any) => s.playback.progressStatus ?? {};
