import React, { useEffect, useState } from "react";
import "./Men.css";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching men products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading Men Collection...</h2>;
  }

  return (
    <div className="men-page">
      <h1 className="men-title">Men Collection</h1>

      <div className="men-grid">
        {products.map((item) => (
          <div className="men-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <h3>{item.title}</h3>
            <p className="price">₹ {Math.round(item.price * 80)}</p>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
