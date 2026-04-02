import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { getImgUrl } from "../../utils/imagePath";
import { fetchProductsByCategory } from "../../utils/api";

import "./child.css";
const Child = () => {
  const cardsRef = useRef([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    navigate(`/product/${item._id || item.id}`, { state: { product: item } });
  };

  useEffect(() => {
    const loadProducts = async () => {
      console.log("Loading child products...");
      setLoading(true);
      const data = await fetchProductsByCategory("child");
      console.log(`Loaded ${data.length} child products`);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);


  useEffect(() => {
    const onScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const overlay = card.querySelector(".image-overlay");
        const rect = card.getBoundingClientRect();

        const windowHeight = window.innerHeight;
        const cardHeight = rect.height;

        const progress = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight + cardHeight), 0),
          1
        );

        const maxMove = cardHeight - 120;
        overlay.style.transform = `translateY(${progress * maxMove}px)`;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="child-page">
      {/* ===== VIDEO ===== */}
      <section className="child-video">
        <video src={getImgUrl("/image8/kidvideo.mp4")} autoPlay loop muted playsInline />
      </section>

      {/* ===== FEATURE IMAGES ===== */}
      <section className="child-images">
        {[
          {
            id: "k-hero-1",
            img: getImgUrl("/image8/kid1.avif"),
            h: "Playful Denim",
            p: "Easy, effortless, with just a hint of attitude.",
          },
          {
            id: "k-hero-2",
            img: getImgUrl("/image8/kid2.avif"),
            h: "Everyday Comfort",
            p: "Made to feel good, designed to feel right.",
          },
        ].map((item, i) => (
          <div
            className="child-image-card clickable"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => handleProductClick({ ...item, image: item.img })}
          >
            <img src={item.img} alt={item.h} />

            <div className="image-overlay">
              <h2>{item.h}</h2>
              <p>{item.p}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="child-products">
        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="child-products-grid">
            {products.map((product, i) => (
              <div
                className="child-product-card clickable"
                key={product._id || i}
                onClick={() => handleProductClick(product)}
              >
                <img src={getImgUrl(product.image)} alt={product.name || product.title} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products available in this category yet.</p>
          </div>
        )}
      </section>


      {/* CATEGORY GRID */}
      <div className="child-container">
        <div className="child-row">
          <div className="child-item clickable" onClick={() => handleProductClick({ id: "k-cat-tees", title: "Child Tees", price: 799, image: getImgUrl("/images9/k11.jpg") })}>
            <img src={getImgUrl("/images9/k11.jpg")} alt="Tees" />
            <div className="child-details">
              <span className="child-category">TEES</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>

          <div className="child-item clickable" onClick={() => handleProductClick({ id: "k-cat-bottom", title: "Child Bottomwear", price: 1199, image: getImgUrl("/images9/k12.jpg") })}>
            <img src={getImgUrl("/images9/k12.jpg")} alt="Bottomwear" />
            <div className="child-details">
              <span className="child-category">BOTTOMWEAR</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="child-row">
          <div className="child-item clickable" onClick={() => handleProductClick({ id: "k-cat-outer", title: "Child Outerwear", price: 1999, image: getImgUrl("/images9/k13.jpg") })}>
            <img src={getImgUrl("/images9/k13.jpg")} alt="Outerwear" />
            <div className="child-details">
              <span className="child-category">OUTERWEAR</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>

          <div className="child-item clickable" onClick={() => handleProductClick({ id: "k-cat-sets", title: "Child Sets", price: 2299, image: getImgUrl("/images9/k14.jpg") })}>
            <img src={getImgUrl("/images9/k14.jpg")} alt="Sets" />
            <div className="child-details">
              <span className="child-category">SETS</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="child-fulltext">
        <h2>CHILDREN'S CLOTHING</h2>

        <p>
          Discover playful, comfortable, and stylish clothing for kids of all ages.
          Our children's clothing collection is designed for everyday adventures,
          from school days to weekend fun.
        </p>

        <p>
          Explore a wide range of essentials including T-shirts, sweatshirts, dresses,
          and bottoms made with soft fabrics that are gentle on young skin.
        </p>

        <p>
          From cozy outerwear to matching sets and seasonal favorites, our kidswear
          is crafted to keep them comfortable and confident.
        </p>

        <div className="child-breadcrumb">
          VOGUECART.COM / <span>CHILD</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="child-footer">
        <div className="child-footer-top">
          <div className="child-footer-col">
            <h4>Shop</h4>
            <ul>
              <li onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>Home</li>
              <li onClick={() => navigate("/men")} style={{ cursor: 'pointer' }}>Men</li>
              <li onClick={() => navigate("/woman")} style={{ cursor: 'pointer' }}>Woman</li>
              <li onClick={() => navigate("/beauty")} style={{ cursor: 'pointer' }}>Beauty</li>
              <li onClick={() => navigate("/child")} style={{ cursor: 'pointer' }}>Child</li>
            </ul>
          </div>

          <div className="child-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li onClick={() => navigate("/info/careers")} style={{ cursor: 'pointer' }}>CAREERS AT VOGUECART</li>
              <li onClick={() => navigate("/info/about-us")} style={{ cursor: 'pointer' }}>ABOUT VOGUECART</li>
              <li onClick={() => navigate("/info/sustainability")} style={{ cursor: 'pointer' }}>SUSTAINABILITY</li>
              <li onClick={() => navigate("/info/press")} style={{ cursor: 'pointer' }}>PRESS</li>
              <li onClick={() => navigate("/info/investor-relations")} style={{ cursor: 'pointer' }}>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="child-footer-col">
            <h4>Help</h4>
            <ul>
              <li onClick={() => navigate("/info/customer-service")} style={{ cursor: 'pointer' }}>CUSTOMER SERVICE</li>
              <li onClick={() => navigate("/info/my-account")} style={{ cursor: 'pointer' }}>MY ACCOUNT</li>
              <li onClick={() => navigate("/info/find-a-store")} style={{ cursor: 'pointer' }}>FIND A STORE</li>
              <li onClick={() => navigate("/info/legal-privacy")} style={{ cursor: 'pointer' }}>LEGAL & PRIVACY</li>
              <li onClick={() => navigate("/info/contact")} style={{ cursor: 'pointer' }}>CONTACT</li>
            </ul>
          </div>

          <div className="child-footer-col child-footer-news">
            <p>
              Join VogueCart Kids and get updates on new arrivals,
              special collections and exclusive offers.
            </p>
            <span className="child-read-more">READ MORE</span>
          </div>
        </div>

        <div className="child-footer-bottom">
          <div className="child-footer-left">
            <div className="child-footer-brand">VOGUECART</div>
            <p className="child-region">
              INDIA (Rs.) <span>CHANGE REGION</span>
            </p>
            <p className="child-copyright">© VOGUECART</p>
          </div>
        </div>
      </footer>



    </div>
  );
};

export default Child;
