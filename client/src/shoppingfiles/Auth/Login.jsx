import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authSuccess } from "../Redux/AuthSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter cumulative email and password.");
      return;
    }

    setError("");
    // Simulate successful login for frontend development
    dispatch(
      authSuccess({
        user: { email, name: "User" },
        token: "dummy-token-" + Date.now(),
      })
    );
    navigate(from, { replace: true });
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="input-group password-group">
            <label>PASSWORD</label>
            <div className="input-with-icon">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <span className="eye-icon"><i className="fa-regular fa-eye"></i></span>
            </div>
          </div>

          <p className="forgot">Have you forgotten your password?</p>

          <button className="btn black-btn" onClick={handleLogin}>
            LOG IN
          </button>

          <button className="btn outline-btn" onClick={() => navigate("/register")}>
            REGISTER
          </button>

          <button className="btn outline-btn qr-btn">
            <i className="fa-solid fa-qrcode"></i> LOG IN WITH QR CODE
          </button>

          <div className="access">
            <h4 className="access-title">ACCESS WITH</h4>
            <p className="privacy-notice">
              By logging in with my social login, I agree to link my account in accordance with the <span className="underline">Privacy Policy</span>
            </p>
            <button className="btn outline-btn social-btn">
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="google" />
              CONTINUE WITH GOOGLE
            </button>
            <button className="btn outline-btn social-btn">
              <i className="fa-brands fa-apple"></i>
              CONTINUE WITH APPLE
            </button>
          </div>

          <div className="help-footer">HELP</div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right"></div>
    </div>
  );
};

export default Login;