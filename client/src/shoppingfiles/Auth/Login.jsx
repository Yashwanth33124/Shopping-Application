import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSuccess } from "../Redux/AuthSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      
      console.log("LOGIN RESPONSE:", data);
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      // ✅ Save JWT
      localStorage.setItem("token", data.accessToken);

      // ✅ Update Redux
      dispatch(
        authSuccess({
          user: { email },
          token: data.accessToken,
        })
      );

      navigate("/");

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="brand">VOGUECART</h1>

        <div className="login-form">
          <h3 className="login-title">LOG IN</h3>

          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn black-btn" onClick={handleLogin}>
            LOG IN
          </button>

          <button
            className="btn outline-btn"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
};

export default Login;