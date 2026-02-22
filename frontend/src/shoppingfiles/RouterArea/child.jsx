import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getImgUrl } from "../../utils/imagePath";

import "./child.css";
const Child = () => {
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

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
          { id: "kf1", img: getImgUrl("/image8/kid1.avif"), title: "Playful Denim", price: "1999" },
          { id: "kf2", img: getImgUrl("/image8/kid2.avif"), title: "Everyday Comfort", price: "2499" },
        ].map((item, i) => (
          <div
            className="child-image-card clickable"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => handleProductClick({ ...item, image: item.img })}
          >
            <img src={item.img} alt={item.title} />
            <div className="image-overlay">
              <h2>{item.title}</h2>
              <p>₹ {item.price}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="child-products">
        <div className="child-products-grid">
          {[
            "k1.jpg",
            "k2.avif",
            "k3.jpg",
            "k4.webp",
            "k5.webp",
            "k6.jpg",
            "k7.jpg",
            "k8.jpg",
            "k9.jpg",
            "k10.jpg",
          ].map((img, i) => {
            const product = {
              id: `child-grid-${i}`,
              title: `Child Casual Wear ${i + 1}`,
              price: "1299",
              image: getImgUrl(`/images9/${img}`)
            };
            return (
              <div
                className="child-product-card clickable"
                key={i}
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.title} />
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORY GRID */}
      <div className="child-container">
        <div className="child-row">
          <div className="child-item">
            <img src={getImgUrl("/images9/k11.jpg")} alt="Tees" />
            <div className="child-details">
              <span className="child-category">TEES</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>

          <div className="child-item">
            <img src={getImgUrl("/images9/k12.jpg")} alt="Bottomwear" />
            <div className="child-details">
              <span className="child-category">BOTTOMWEAR</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="child-row">
          <div className="child-item">
            <img src={getImgUrl("/images9/k13.jpg")} alt="Outerwear" />
            <div className="child-details">
              <span className="child-category">OUTERWEAR</span>
              <span className="child-explore">EXPLORE</span>
            </div>
          </div>

          <div className="child-item">
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
              <li>LADIES</li>
              <li>MEN</li>
              <li>KIDS</li>
              <li>HOME</li>
              <li>BEAUTY</li>
            </ul>
          </div>

          <div className="child-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li>CAREERS</li>
              <li>ABOUT VOGUECART</li>
              <li>SUSTAINABILITY</li>
              <li>PRESS</li>
              <li>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="child-footer-col">
            <h4>Help</h4>
            <ul>
              <li>CUSTOMER SERVICE</li>
              <li>MY ACCOUNT</li>
              <li>FIND A STORE</li>
              <li>LEGAL & PRIVACY</li>
              <li>CONTACT</li>
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
