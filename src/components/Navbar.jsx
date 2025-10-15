// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const token = useSelector(s => s.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/products">Products</Link>
        <Link to="/crud">CRUD</Link>
      </div>
      <div className="nav-right">
        {token ? (
          <button className="btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
