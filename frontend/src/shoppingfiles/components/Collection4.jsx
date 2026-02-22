import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImgUrl } from "../../utils/imagePath";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";

import "./Collection4.css";

// TOAST
import Toast from "./Toast";

const productsData = [
  // ===== MEN =====
  { id: 1, title: "Men Premium Jacket", category: "MEN", price: 2499, image: getImgUrl("/images6/men11.avif") },
  { id: 2, title: "Men Streetwear Hoodie", category: "MEN", price: 1999, image: getImgUrl("/images6/men12.avif") },
  { id: 3, title: "Men Casual Outfit", category: "MEN", price: 1799, image: getImgUrl("/images6/men13.avif") },
  { id: 4, title: "Men Winter Collection", category: "MEN", price: 2699, image: getImgUrl("/images6/men14.avif") },
  { id: 5, title: "Men Urban Style", category: "MEN", price: 2199, image: getImgUrl("/images6/men15.avif") },
  { id: 6, title: "Men Modern Fit", category: "MEN", price: 2399, image: getImgUrl("/images6/men16.avif") },
  { id: 7, title: "Men Signature Look", category: "MEN", price: 2899, image: getImgUrl("/images6/men17.avif") },

  // 🔥 NEW MEN (WEBP)
  { id: 8, title: "Men Bold Streetwear", category: "MEN", price: 2599, image: getImgUrl("/images6/men18.webp") },
  { id: 9, title: "Men Classic Black Fit", category: "MEN", price: 2799, image: getImgUrl("/images6/men19.webp") },
  { id: 10, title: "Men Oversized Style", category: "MEN", price: 2299, image: getImgUrl("/images6/men20.webp") },
  { id: 11, title: "Men Modern Layered Look", category: "MEN", price: 2999, image: getImgUrl("/images6/men21.webp") },
  { id: 12, title: "Men Minimal Fashion", category: "MEN", price: 2199, image: getImgUrl("/images6/men22.webp") },
  { id: 13, title: "Men Urban Essentials", category: "MEN", price: 2399, image: getImgUrl("/images6/men23.webp") },
  { id: 14, title: "Men Signature Street", category: "MEN", price: 3199, image: getImgUrl("/images6/men24.webp") },

  // ===== WOMEN =====
  { id: 15, title: "Women Luxury Coat", category: "WOMEN", price: 2999, image: getImgUrl("/images6/woman11.avif") },
  { id: 16, title: "Women Elegant Wear", category: "WOMEN", price: 2599, image: getImgUrl("/images6/woman12.avif") },
  { id: 17, title: "Women Trendy Outfit", category: "WOMEN", price: 2299, image: getImgUrl("/images6/woman13.avif") },
  { id: 18, title: "Women Chic Style", category: "WOMEN", price: 2799, image: getImgUrl("/images6/woman14.avif") },
  { id: 19, title: "Women Modern Fashion", category: "WOMEN", price: 2499, image: getImgUrl("/images6/woman15.avif") },
  { id: 20, title: "Women Signature Look", category: "WOMEN", price: 2899, image: getImgUrl("/images6/woman16.avif") },

  // 🔥 NEW WOMEN (JPG)
  { id: 21, title: "Women Urban Elegance", category: "WOMEN", price: 3099, image: getImgUrl("/images6/woman17.jpg") },
  { id: 22, title: "Women Soft Minimal Look", category: "WOMEN", price: 2699, image: getImgUrl("/images6/woman18.jpg") },
  { id: 23, title: "Women Street Chic", category: "WOMEN", price: 2899, image: getImgUrl("/images6/woman19.jpg") },
  { id: 24, title: "Women Contemporary Style", category: "WOMEN", price: 3299, image: getImgUrl("/images6/woman20.jpg") },
];

const Collection4 = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, text: "" });
  const [filter, setFilter] = useState("ALL");

  const filteredProducts =
    filter === "ALL"
      ? productsData
      : productsData.filter((item) => item.category === filter);

  const dispatch = useDispatch();

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation(); // Prevent card navigation
    dispatch(cartActions.addToCart(item));
    setNotification({ show: true, text: `${item.title} added to bag` });
    setTimeout(() => setNotification({ show: false, text: "" }), 2500);
  };

  return (
    <section className="collection4">
      {notification.show && <Toast text={notification.text} type="success" />}

      <h2 className="c4-title">Trending Collection</h2>

      <div className="c4-filters">
        <button onClick={() => setFilter("ALL")} className={filter === "ALL" ? "active" : ""}>ALL</button>
        <button onClick={() => setFilter("MEN")} className={filter === "MEN" ? "active" : ""}>MEN</button>
        <button onClick={() => setFilter("WOMEN")} className={filter === "WOMEN" ? "active" : ""}>WOMEN</button>
      </div>

      <div className="c4-grid">
        {filteredProducts.map((item) => (
          <div className="c4-card" key={item.id} onClick={() => handleProductClick(item)}>
            <div className="c4-img-wrap">
              <span className="c4-badge">NEW</span>
              <img src={item.image} alt={item.title} />
            </div>

            <div className="c4-info">
              <h4>{item.title}</h4>
              <p className="c4-category">{item.category}</p>
              <p className="c4-price">₹ {item.price}</p>

              <button
                className="c4-add-btn"
                onClick={(e) => handleAddToCart(e, item)}
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
