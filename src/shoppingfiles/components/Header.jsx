import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cartdropdown from "../Cartdown/Cartdropdown";
import logo from "../../assets/logo.png";

const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`headersection ${
          scrolled || hovered ? "header-bg-white" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* LEFT */}
        <div className="left">
          <NavLink to="/" className="brand-link">
            <div className="brand-group">
              <img src={logo} alt="VogueCart Logo" className="logo-img" />
              <span className="title">VOGUECART</span>
            </div>
          </NavLink>

          <div className="search">
            <input type="text" placeholder="Search products" />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="center">
          <ul>
            <li><NavLink to="/" className="nav-link">HOME</NavLink></li>
            <li><NavLink to="/men" className="nav-link">MEN</NavLink></li>
            <li><NavLink to="/woman" className="nav-link">WOMAN</NavLink></li>
            <li><NavLink to="/beauty" className="nav-link">BEAUTY</NavLink></li>
            <li><NavLink to="/child" className="nav-link">CHILD</NavLink></li>
          </ul>
        </nav>

        {/* RIGHT */}
        <div className="right">
          <div
            className="mobile-menu-icon"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars />
          </div>

          <div style={{ position: "relative" }}>
            <button
              className="cart"
              onClick={() => setOpenCart((prev) => !prev)}
            >
              <span className="cart-text">
                Cart {cartCount > 0 && `(${cartCount})`}
              </span>
              <span className="cart-icon">
                <FaCartArrowDown />
              </span>
            </button>

            {openCart && (
              <Cartdropdown close={() => setOpenCart(false)} />
            )}
          </div>

          {/* PROFILE ICON (Thin Outline Style) */}
          <NavLink to="/login" className="profile-icon">
            <FiUser />
          </NavLink>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      <div className={`mobile-drawer ${mobileMenu ? "open" : ""}`}>
        <div className="drawer-header">
          <span>MENU</span>
          <FaTimes onClick={() => setMobileMenu(false)} />
        </div>

        <NavLink to="/" onClick={() => setMobileMenu(false)}>
          HOME
        </NavLink>
        <NavLink to="/men" onClick={() => setMobileMenu(false)}>
          MEN
        </NavLink>
        <NavLink to="/woman" onClick={() => setMobileMenu(false)}>
          WOMAN
        </NavLink>
        <NavLink to="/beauty" onClick={() => setMobileMenu(false)}>
          BEAUTY
        </NavLink>
        <NavLink to="/child" onClick={() => setMobileMenu(false)}>
          CHILD
        </NavLink>
      </div>
    </>
  );
};

export default Header;