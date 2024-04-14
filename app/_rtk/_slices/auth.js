import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    let storedAuthData = null;
    if (typeof window !== "undefined") {
      storedAuthData = JSON.parse(localStorage.getItem("authData"));
    }

    return storedAuthData
      ? storedAuthData
      : {
          token: null,
          email: null,
          displayName: null,
          role: null,
        };
  },
  reducers: {
    setAuthData: (state, action) => {
      const { token, email, displayName, role } = action.payload;
      if (token && email) {
        state.token = token;
        state.email = email;
        state.displayName = displayName;
        state.role = role;
        if (typeof window !== "undefined") {
          localStorage.setItem("authData", JSON.stringify(action.payload));
        }
      } else {
        console.error("Invalid authentication data");
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
