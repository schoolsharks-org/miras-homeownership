import { createSlice } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    updateLeaderboard: (state, action) => {
      return action.payload;
    }
  }
});

export const { updateLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
