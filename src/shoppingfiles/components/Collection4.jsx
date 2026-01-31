import React, { useEffect, useState } from "react";
import "./Collection4.css";

// REDUX
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/Cartslice';

// TOAST
import Toast from "./Toast";

const Collection4 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        image: item.image,
        price: Math.round(item.price * 80),
      })
    );

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (loading) {
    return <div className="c4-loading">Loading Products...</div>;
  }

  return (
    <section className="collection4">
      {showToast && <Toast text="Added to cart 🛒" />}

      <h2 className="c4-title">Trending Products</h2>

      <div className="c4-grid">
        {products.map((item) => (
          <div className="c4-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="c4-info">
              <h4>{item.title}</h4>
              <p className="c4-category">{item.category}</p>
              <p className="c4-price">₹ {Math.round(item.price * 80)}</p>

              {/* ✅ ADD TO CART IS BACK */}
              <button
                className="c4-add-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection4;
