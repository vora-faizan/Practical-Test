// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer
  },
});

export default store;
