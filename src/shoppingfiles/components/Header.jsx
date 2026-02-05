import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cartdropdown from "../Cartdown/Cartdropdown";
import logo from "../../assets/logo.png";

const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const [showBrand, setShowBrand] = useState(true);

  const cartItems = useSelector((state) => state.cart.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setShowBrand(window.scrollY === 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <header className="headersection">
      {/* LEFT */}
      <div className="left">
        <div className={`brand-group ${!showBrand ? "brand-hide" : ""}`}>
          <NavLink to="/" className="brand-link">
            <img src={logo} alt="VogueCart Logo" className="logo-img" />
            <span className="title">VOGUECART</span>
          </NavLink>
        </div>

        <div className="search">
          <input type="text" placeholder="Search products" />
        </div>
      </div>

      {/* CENTER */}
      <nav className="center">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/men" className="nav-link">
              MEN
            </NavLink>
          </li>
          <li>
            <NavLink to="/woman" className="nav-link">
              WOMAN
            </NavLink>
          </li>
          <li>
            <NavLink to="/beauty" className="nav-link">
              BEAUTY
            </NavLink>
          </li>
          <li>
            <NavLink to="/child" className="nav-link">
              CHILD
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* RIGHT */}
      <div className="right">
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

          {openCart && <Cartdropdown close={() => setOpenCart(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
