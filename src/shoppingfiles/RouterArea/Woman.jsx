import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getImgUrl } from "../../utils/imagePath";

import "./Woman.css";

const Woman = () => {
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
    <div className="woman-page">
      {/* ===== VIDEO ===== */}
      <section className="woman-video">
        <video src={getImgUrl("/images4/gv.webm")} autoPlay loop muted playsInline />
      </section>

      {/* ===== FIRST 2 FEATURE IMAGES ===== */}
      <section className="woman-images">
        {[
          { id: "wf1", img: getImgUrl("/images5/fashine1.avif"), title: "Denim Edit", price: "2999" },
          { id: "wf2", img: getImgUrl("/images5/fashine2.avif"), title: "Urban Casual", price: "3499" },
        ].map((item, i) => (
          <div
            className="woman-image-card clickable"
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

      {/* ===== GRID IMAGES (fashion3-1 to fashion3-10) ===== */}
      <section className="woman-grid">
        {Array.from({ length: 12 }).map((_, i) => {
          const product = {
            id: `woman-grid-${i}`,
            title: `Woman Chic Outfit ${i + 1}`,
            price: "2599",
            image: getImgUrl(`/images5/fashine3 (${i + 1}).avif`)
          };
          return (
            <div
              className="woman-grid-card clickable"
              key={i}
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.title} />
            </div>
          );
        })}
      </section>
      <div className="hw-container">
        <div className="hw-row">
          <div className="hw-item">
            <img src={getImgUrl("/images5/fashine4.avif")} alt="w1" />
            <div className="hw-details">
              <span className="category">TOPS</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hw-item">
            <img src={getImgUrl("/images5/fashine5.avif")} alt="w2" />
            <div className="hw-details">
              <span className="category">DRESSES</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="hw-row">
          <div className="hw-item">
            <img src={getImgUrl("/images5/fashine6.avif")} alt="w3" />
            <div className="hw-details">
              <span className="category">OUTERWEAR</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hw-item">
            <img src={getImgUrl("/images5/fashine7.avif")} alt="w4" />
            <div className="hw-details">
              <span className="category">TAILORING</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="women-fulltext">
        <h2>WOMEN'S CLOTHING</h2>

        <p>
          Discover all the latest trends your wardrobe will love in our women's
          clothing collection. From everyday must-haves like tops, T-shirts, and
          dresses to cozy loungewear and stylish co-ord sets, we’ve got you covered
          for every mood and moment. Got a special occasion coming up? Explore our
          range of elegant blazers, skirts, and party-ready outfits designed to
          make you stand out effortlessly.
        </p>

        <p>
          When it comes to women’s bottoms, choose from flattering jeans, chic
          trousers, comfy leggings, and trendy cargos in a variety of colors and
          fits. Love denim? Our women’s jeans come in styles like skinny, straight,
          wide-leg, and mom fits to match your personal vibe. Pair them with a
          statement blouse, oversized shirt, or a classic crop top from our latest
          edits.
        </p>

        <p>
          And for cooler days, our women’s jackets and coats have your layering
          needs sorted — from warm puffer jackets and stylish trench coats to
          timeless leather jackets and trendy blazers, perfect for all seasons.
        </p>
      </div>
      <div className="women-breadcrumb">
        VOGUECART.COM / <span>WOMEN</span>
      </div>
      <footer className="women-footer">
        <div className="women-footer-top">
          <div className="women-footer-col">
            <h4>Shop</h4>
            <ul>
              <li>WOMEN</li>
              <li>MEN</li>
              <li>KIDS</li>
              <li>HOME</li>
              <li>BEAUTY</li>
            </ul>
          </div>

          <div className="women-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li>CAREERS AT VOGUECART</li>
              <li>ABOUT VOGUECART GROUP</li>
              <li>SUSTAINABILITY</li>
              <li>PRESS</li>
              <li>INVESTOR RELATIONS</li>
              <li>CORPORATE GOVERNANCE</li>
            </ul>
          </div>

          <div className="women-footer-col">
            <h4>Help</h4>
            <ul>
              <li>CUSTOMER SERVICE</li>
              <li>MY VOGUECART</li>
              <li>FIND A STORE</li>
              <li>LEGAL & PRIVACY</li>
              <li>CONTACT</li>
              <li>SECURE SHOPPING</li>
              <li>COOKIE NOTICE</li>
              <li>COOKIE SETTINGS</li>
            </ul>
          </div>

          <div className="women-footer-col women-footer-news">
            <p>
              Sign up now and be the first to know about exclusive offers, new
              collections, and women’s style inspiration.
            </p>
            <span className="women-read-more">READ MORE</span>
          </div>
        </div>

        <div className="women-footer-bottom">
          <div className="women-footer-left">
            <div className="women-footer-brand">VOGUECART</div>

            <p className="women-region">
              INDIA (Rs.) <span>CHANGE REGION</span>
            </p>

            <p className="women-copyright">
              The content of this site is copyright-protected and is the property of
              VOGUECART & Mauritz AB.
            </p>
          </div>

          <div className="women-footer-social">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-spotify"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-facebook"></i>
          </div>
        </div>
      </footer>

    </div>


  );
};

export default Woman;
