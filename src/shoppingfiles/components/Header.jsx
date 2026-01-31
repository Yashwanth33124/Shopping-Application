import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import Cartdropdown from "../Cartdown/Cartdropdown";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`headersection ${scrolled ? "scrolled" : ""}`}>
      
      {/* LEFT */}
      <div className="left">
        <div className="brand-group">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="title">VOGUECART</span>
        </div>
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
      </div>

      {/* CENTER */}
      <div className="center">
        <ul>
          <li>Men</li>
          <li>Woman</li>
          <li>Beauty</li>
          <li>Children</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="signin">Signin / Signup</div>

        <div style={{ position: "relative" }}>
          <button className="cart" onClick={() => setOpenCart(!openCart)}>
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

    </div>
  );
};

export default Header;
