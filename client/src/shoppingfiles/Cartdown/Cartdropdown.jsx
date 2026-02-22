import React, { useEffect } from "react";
import "./Cartdropdown.css";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cartdropdown = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  // 🔥 AUTO CLOSE AFTER 1.5s WHEN CART IS EMPTY
  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        close();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [cartItems, close]);

  const handleRemove = (id) => {
    dispatch(cartActions.deleteFromCart(id));
  };

  const handleViewCart = () => {
    close();
    navigate("/cart");
  };

  return (
    <div className="cart-dropdown">
      {/* HEADER */}
      <div className="cart-header">
        <h4>My Cart</h4>
        <span>{totalItems} items</span>
      </div>

      {/* ITEMS */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-item-info">
                <p className="title">{item.title}</p>
                <span>Qty: {item.quantity}</span>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      {cartItems.length > 0 && (
        <button className="view-cart-btn" onClick={handleViewCart}>
          View Cart
        </button>
      )}
    </div>
  );
};

export default Cartdropdown;
