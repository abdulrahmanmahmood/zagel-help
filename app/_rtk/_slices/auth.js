"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  displayName: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { token, email, displayName, role } = action.payload;
      state.token = token;
      state.email = email;
      state.displayName = displayName;
      state.role = role;
      if (typeof window !== "undefined") {
        localStorage.setItem("authData", JSON.stringify(action.payload));
      }
    },
    clearAuthData: (state) => {
      state.token = null;
      state.email = null;
      state.displayName = null;
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authData");
      }
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export const selectAuthData = (state) => state.auth;
export default authSlice.reducer;
