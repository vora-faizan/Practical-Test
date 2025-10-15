// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      console.log("Hll",res.data);
      // res.data contains token, user etc.
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// register thunk (dummyjson has /users/add)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/add", payload);
      return res.data;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Register failed";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  registerSuccess: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, action) => {
  s.loading = false;
  s.user = action.payload; // pura user object
  s.token = action.payload.token || "dummy-token"; // agar token missing ho to dummy
  localStorage.setItem("token", s.token);
  s.error = null;
})

      .addCase(loginUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, action) => {
        s.loading = false;
        s.registerSuccess = action.payload;
        s.error = null;
      })
      .addCase(registerUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload || "Register failed";
      });
  }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
