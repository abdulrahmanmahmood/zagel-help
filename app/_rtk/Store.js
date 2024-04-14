"use client";
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./_slices/auth";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});
