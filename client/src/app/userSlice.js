import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  name: null,
  email:null,
  session: null,
  sq: null,
  investment: 0,
  wealth: 0,
  // happiness: 0,
  // ranking: 0,
  answered: 0,
  error: null,
  status: 'idle',
  totalPlayers: 0,
  goalReachPercentage:0,
  // connectionRequested: false
};

export const createUser = createAsyncThunk(
  "user/create",
  async ({ username, email, phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/create`, {
        name: username,
        email,
        phone: phoneNumber,
      });
      const { user, session, sq ,totalPlayers} = response.data;
      localStorage.setItem("user", user)
      localStorage.setItem("session", session)
      return { user, session, sq, username,totalPlayers };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const sendConnectionRequest = createAsyncThunk(
//   "user/connectionRequest",
//   async ({ userId,email }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/connectionRequest`, {
//         userId,email
//       })
//       if (response.data.success) {
//         return { success: true }
//       }
//       else {
//         return { success: false }
//       }
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload?.user ?? state.user;
      state.session = action.payload?.session ?? state.session;
      state.name = action.payload?.name ?? state.name;
      state.sq = action.payload?.sq ?? state.sq;
      state.email=action.payload?.email??state.email;
      state.investment = action.payload?.investment ?? state.investment;
      state.wealth = action.payload?.wealth ?? state.wealth;
      state.goalReachPercentage=action.payload?.goalReachPercentage ?? state.goalReachPercentage
      // state.happiness = action.payload?.happiness ?? state.happiness;
      state.answered = action.payload?.answered ?? state.answered;
      state.totalPlayers = action.payload?.totalPlayers ?? state.totalPlayers
      // state.ranking = action.payload?.ranking ?? state.ranking
      // state.connectionRequested=action.payload?.connectionRequested??state.connectionRequested
    },
    resetState:(state)=>{
      state.user =null;
      state.session =null;
      state.name =null;
      state.sq =null;
      state.email=null;
      state.investment =null;
      state.wealth =null;
      state.goalReachPercentage=null;
      state.answered =null;
      state.totalPlayers =null;
      state.status="idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload?.user;
        state.session = action.payload?.session;
        state.sq = action.payload?.sq;
        state.name = action.payload?.username;
        state.totalPlayers=action.payload?.totalPlayers;
        state.error = null;

      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // .addCase(sendConnectionRequest.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      // .addCase(sendConnectionRequest.fulfilled, (state, action) => {
      //   if (action.payload?.success) {
      //     state.connectionRequested= true
      //   }
      //   state.status="succeeded"
      // })
      // .addCase(sendConnectionRequest.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload?;
      // });
  },
});

export const { setError, setUser ,resetState} = usersSlice.actions;

export default usersSlice.reducer;
