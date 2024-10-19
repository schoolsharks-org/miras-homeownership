import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import questionReducer from "./questionSlice"
import leaderboardReducer from "./leaderboardSlice"
import adminReducer from "./adminSlice"

const store = configureStore({
  reducer: {
    user:userReducer,
    question:questionReducer,
    leaderboard:leaderboardReducer,
    admin:adminReducer
  },
});

export default store;



