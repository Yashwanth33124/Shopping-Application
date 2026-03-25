import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser, FiHeart } from "react-icons/fi";
import { PiShoppingBag } from "react-icons/pi";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import Cartdropdown from "../Cartdown/Cartdropdown";
import logo from "../../assets/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isPrime } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const location = useLocation();

  const [openCart, setOpenCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Clear search term when navigating away from search results
  useEffect(() => {
    if (location.pathname !== "/search") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header
        className={`headersection ${scrolled || hovered ? "header-bg-white" : ""}`}
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
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?q=${searchTerm}`);
                }
              }}
            />
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
          <div className="mobile-menu-icon" onClick={() => setMobileMenu(true)}>
            <FaBars />
          </div>

          <div className="wishlist-btn-group">
            <NavLink to="/wishlist" className="wishlist-link">
              <FiHeart />
            </NavLink>
          </div>

          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setOpenCart(true)}
            onMouseLeave={() => setOpenCart(false)}
          >
            <button
              className="cart-btn-premium"
              onClick={() => {
                setOpenCart(false);
                navigate("/cart");
              }}
            >
              <PiShoppingBag />
              {cartCount > 0 && <span className="cart-count-below">{cartCount}</span>}
            </button>

            {openCart && <Cartdropdown close={() => setOpenCart(false)} />}
          </div>

          <div className="auth-group">
            <NavLink
              to={isAuthenticated ? "/account" : "/login"}
              className={`profile-icon ${isPrime ? 'prime-aura' : ''}`}
            >
              <FiUser />
              {isPrime && <span className="prime-signature">VOGUE PRIME</span>}
            </NavLink>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileMenu ? "open" : ""}`}>
        <div className="drawer-header">
          <span>MENU</span>
          <FaTimes onClick={() => setMobileMenu(false)} />
        </div>
        <NavLink to="/" onClick={() => setMobileMenu(false)}>HOME</NavLink>
        <NavLink to="/men" onClick={() => setMobileMenu(false)}>MEN</NavLink>
        <NavLink to="/woman" onClick={() => setMobileMenu(false)}>WOMAN</NavLink>
        <NavLink to="/beauty" onClick={() => setMobileMenu(false)}>BEAUTY</NavLink>
        <NavLink to="/child" onClick={() => setMobileMenu(false)}>CHILD</NavLink>
      </div>
    </>
  );
};

export default Header;