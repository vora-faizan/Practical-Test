// src/api/api.js
import axios from "axios";

const API_BASE = "https://dummyjson.com";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

// request interceptor: attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
