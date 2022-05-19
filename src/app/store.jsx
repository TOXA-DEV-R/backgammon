/** @format */

import { configureStore } from "@reduxjs/toolkit";
import finalScoreSlice from "../features/finalScore/finalScoreSlice";
import modalSlice from "../features/modal/modalSlice";
import playerSlice from "../features/player/playerSlice";

const store = configureStore({
  reducer: {
    player: playerSlice,
    modal: modalSlice,
    finalScore: finalScoreSlice,
  },
});

export default store;
