// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((s) => s.auth.token);
  const location = useLocation();

  if (!token) {
    // redirect to login with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
