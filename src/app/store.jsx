/** @format */

import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../features/player/playerSlice";

const store = configureStore({
  reducer: {
    player: playerSlice,
  },
});

export default store;
