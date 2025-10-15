// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector(s => s.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/products";

async function handleSubmit(e) {
  e.preventDefault();

  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  console.log("Sending:", cleanUsername, cleanPassword);

  try {
    const resultAction = await dispatch(loginUser({ username: cleanUsername, password: cleanPassword })).unwrap();
    console.log("Login result:", resultAction); // <--- dekho token aa raha hai ya nahi
    navigate(from, { replace: true });
  } catch (err) {
    console.error("Login failed:", err);
  }
}




  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
       <input
  value={username}
  onChange={e => setUsername(e.target.value.trimStart())}
  required
/>
<label>Passwords</label>
<input
  type="password"
  value={password}
  onChange={e => setPassword(e.target.value.trimStart())}
  required
/>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
      {error && <div className="error">{typeof error === "string" ? error : JSON.stringify(error)}</div>}
      <p>Not registered? <Link to="/register">Register here</Link></p>

      <div style={{marginTop:12,fontSize:12,color:'#666'}}>
        <strong>Note:</strong> DummyJSON has sample accounts like <code>emilys</code> with password <code>emilyspass</code> (try that if you want a quick login).
      </div>
    </div>
  );
}
