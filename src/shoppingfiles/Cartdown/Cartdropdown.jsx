import "./Cartdropdown.css";
import { useEffect } from "react";

const Cartdropdown = ({ close }) => {
  const cartItems = []; // Temporarily removed Redux
  const totalItems = 0;

  // 🔥 AUTO CLOSE AFTER 1s WHEN CART IS EMPTY
  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        close();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cartItems, close]);

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
                onClick={() => console.log("Remove item:", item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      {cartItems.length > 0 && (
        <button className="view-cart-btn">
          View Cart
        </button>
      )}
    </div>
  );
};

export default Cartdropdown;
