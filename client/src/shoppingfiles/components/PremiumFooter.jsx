import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function AnimatedWaveFooter() {
  const navigate = useNavigate();
  return (
    <footer className="footer">

      {/* WAVE */}
      {/* <div className="wave">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,245.3C672,256,768,224,864,192C960,160,1056,128,1152,149.3C1248,171,1344,245,1392,282.7L1440,320V0H0Z"
          />
        </svg>
      </div> */}

      {/* CONTENT */}
      <div className="footer-content">

        <div>
          <h3>Stay Connected</h3>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>

        <div>
          <h3>Shop</h3>
          <p onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>Home</p>
          <p onClick={() => navigate("/men")} style={{ cursor: 'pointer' }}>Men</p>
          <p onClick={() => navigate("/woman")} style={{ cursor: 'pointer' }}>Woman</p>
          <p onClick={() => navigate("/beauty")} style={{ cursor: 'pointer' }}>Beauty</p>
          <p onClick={() => navigate("/child")} style={{ cursor: 'pointer' }}>Child</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: hello@example.com</p>
          <p>Phone: +91 9618391199</p>
        </div>

        <div>
          <h3>Follow Us</h3>
          <div className="socials">
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 Shopping Fashion. All rights reserved.</span>
        <span className="footer-credit">
          Built by <strong>Yashwanth Kumar</strong>
        </span>
      </div>

    </footer>
  );
}
