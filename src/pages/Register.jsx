// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, registerSuccess } = useSelector(s => s.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(registerUser({
        firstName, lastName, username, password
      })).unwrap();
      // after register, suggest login
    } catch (err) {
      // error handled
    }
  }

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input value={firstName} onChange={e=>setFirstName(e.target.value)} required />
        <label>Last name</label>
        <input value={lastName} onChange={e=>setLastName(e.target.value)} />
        <label>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>

      {registerSuccess && <div className="success">Registered! Now <Link to="/login">login</Link>.</div>}
      {error && <div className="error">{JSON.stringify(error)}</div>}
    </div>
  );
}
