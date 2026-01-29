import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`headersection ${scrolled ? "scrolled" : ""}`}>
      
      {/* LEFT: Logo and Title together */}
    {/* LEFT: Logo and Title together */}
<div className="left">
  <NavLink to="/" className="brand-link">
    <div className="brand-group">
      <img src={logo} alt="logo" className="logo-img" />
      <span className="title">VOGUECART</span>
    </div>
  </NavLink>

  <div className="search">
    <input type="text" placeholder="Search" />
  </div>
</div>

      {/* CENTER */}
      <div className="center">
        <ul>
          <li><NavLink to="/men">Men</NavLink></li>
          <li><NavLink to="/woman">Woman</NavLink></li>
          <li><NavLink to="/beauty">Beauty</NavLink></li>
          <li><NavLink to="/child">Children</NavLink></li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="signin">Signin / Signup</div>

        <button className="cart">
          <span className="cart-text">Cart</span>
          <span className="cart-icon">
            <FaCartArrowDown />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;