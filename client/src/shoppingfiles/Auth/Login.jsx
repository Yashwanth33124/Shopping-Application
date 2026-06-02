import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { authSuccess } from "../Redux/AuthSlice";
import { getApiUrl } from "../../config/api.config.js";
import "./Login.css";
import HelpModal from "../components/HelpModal";
import Toast from "../components/Toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState({ show: false, text: "", type: "success" });

  const triggerToast = (text, type = "success") => {
    setNotification({ show: true, text, type });
    setTimeout(() => setNotification({ show: false, text: "", type: "success" }), 2500);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        getApiUrl("/auth/login"),
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

      dispatch(
        authSuccess({
          user: data.user,
          token: data.accessToken,
        })
      );

      triggerToast("Successfully logged in! Redirecting...", "success");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      {notification.show && <Toast text={notification.text} type={notification.type} />}
      <div className="login-left">
        <h1 className="brand">VOGUECART</h1>

        <div className={`login-form ${error ? 'shake' : ''}`}>
          <h3 className="login-title">LOG IN</h3>

          {error && (
            <div className="unique-error-box">
              <div className="error-icon">!</div>
              <div className="error-text">{error}</div>
            </div>
          )}

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


          <div className="help-footer" onClick={() => setShowHelp(true)}>HELP</div>
        </div>
      </div>

      <div className="login-right"></div>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default Login;