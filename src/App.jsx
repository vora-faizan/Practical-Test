// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductCRUD from "./pages/ProductCRUD";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/products" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          } />

          <Route path="/crud" element={
            <ProtectedRoute>
              <ProductCRUD />
            </ProtectedRoute>
          } />

          <Route path="*" element={<div>404 - Not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
