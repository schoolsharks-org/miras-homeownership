import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loggedIn: false,
    error: null,
    currentSession: null,
    pastSessions: [],
    activeSession: null,
    pastSessionData: null,
};

export const createSession = createAsyncThunk(
    'admin/createSession',
    async (sessionCreationHandler, { rejectWithValue }) => {
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/admin/createSession');
            console.log(response.data)
            sessionCreationHandler();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const fetchSessions = createAsyncThunk(
    'admin/fetchSessions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL + '/admin/fetchSessions');
            console.log(response.data.pastSessions)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const closeSession = createAsyncThunk(
    'admin/closeSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/admin/closeSession');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getPastSession = createAsyncThunk(
    'admin/getPastSession',
    async ({sessionId,navigate}, { rejectWithValue }) => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL + `/admin/getPastSession?sessionId=${sessionId}`);
            navigate(`/admin/sessions/past-session/${sessionId}`)
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getPastSessionReport = createAsyncThunk(
    'admin/getPastSessionReport',
    async ({ sessionId }, { rejectWithValue }) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/getSessionReport`, { sessionId });
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.loggedIn = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSession.pending, (state) => {
                state.error = null;
            })
            .addCase(createSession.fulfilled, (state, action) => {
                state.currentSession = action.payload.session;
                state.error = null;
            })
            .addCase(createSession.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchSessions.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                state.currentSession = action.payload.currentSession ?? null;
                state.pastSessions = action.payload.pastSessions ?? [];
                state.error = null;
            })
            .addCase(fetchSessions.rejected, (state, action) => {
                state.error = null;
            })
            .addCase(closeSession.pending, (state) => {
                state.error = null;
            })
            .addCase(closeSession.fulfilled, (state,action) => {
                state.pastSessions=[...state.pastSessions,{_id:state.currentSession?.id,name:state.currentSession?.name,createdAt:Date.now()}]
                state.currentSession = action.payload.currentSession;
                state.error = null;
            })
            .addCase(closeSession.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getPastSession.pending, (state) => {
                state.error = null;
            })
            .addCase(getPastSession.fulfilled, (state, action) => {
                state.pastSessionData = action.payload;
                state.error = null;
            })
            .addCase(getPastSession.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { setAuth, setError } = adminSlice.actions;
export default adminSlice.reducer;
