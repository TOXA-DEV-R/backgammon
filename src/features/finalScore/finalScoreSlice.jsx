/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFinalScore: false,
};

const finalScoreSlice = createSlice({
  name: "finalScore",
  initialState,
  reducers: {
    closeFinalScore: (state) => {
      state.isFinalScore = false;
    },
    openFinalScore: (state) => {
      state.isFinalScore = true;
    },
  },
});

export const { closeFinalScore, openFinalScore } = finalScoreSlice.actions;

export default finalScoreSlice.reducer;
