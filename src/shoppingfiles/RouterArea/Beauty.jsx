import React, { useEffect, useRef } from "react";
import "./Beauty.css";

const Beauty = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const text = card.querySelector(".beauty2-text");
        if (!text) return;

        const rect = card.getBoundingClientRect();
        const windowH = window.innerHeight;
        const cardH = rect.height;

        const progress = Math.min(
          Math.max((windowH - rect.top) / (windowH + cardH), 0),
          1
        );

        const maxMove = cardH - 140;
        text.style.transform = `translateY(${progress * maxMove}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="beauty-page">

      {/* 🔥 FIRST BANNER (KEEP THIS) */}
      <div className="beauty-banner">
        <img src="/images10/first.png" alt="Beauty Banner" />
      </div>

      {/* 🔥 GRID SECTION */}
      <section className="beauty2-page">
        <div className="beauty2-media-section">

          {/* LEFT IMAGE */}
          <div
            className="beauty2-media-left"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <img src="/images10/fifth.jpg" alt="Glow Beauty" />
            <div className="beauty2-text">
              <h2>Pure Glow</h2>
              <p>Timeless beauty. Effortless confidence.</p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="beauty2-media-right"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <img src="/images10/fourth.avif" alt="Radiant Skin" />
            <div className="beauty2-text">
              <h2>Radiant Essence</h2>
              <p>Soft elegance meets modern luxury.</p>
            </div>
          </div>



        </div>
      </section>

      {/* SIXTH IMAGE SECTION */}
      <div className="beauty-bottom-section">
        <img src="/images10/sixth.jpg" alt="Lipstick" />
      </div>
      {/* LUXURY PRODUCT SHOWCASE */}
      <section className="beauty-products">

        <h2 className="product-heading">Luxury Collection</h2>

        <div className="product-grid">

          {[
            ...Array.from({ length: 7 }, (_, i) => `/images10/bag${i + 1}.avif`),
            ...Array.from({ length: 7 }, (_, i) => `/images10/lp${i + 1}.avif`),
            ...Array.from({ length: 7 }, (_, i) => `/images10/makeup${i + 1}.avif`),
            ...Array.from({ length: 2 }, (_, i) => `/images10/perfume${i + 1}.avif`)
          ].map((src, index) => (
            <div className="product-card" key={index}>
              <img src={src} alt="Beauty Product" />
              <div className="product-overlay">
                <button>Shop Now</button>
              </div>
            </div>
          ))}

        </div>
      </section>

      <div className="beauty-fulltext">
        <h2>BEAUTY</h2>

        <p>
          Discover the latest in beauty essentials and skincare must-haves in our
          beauty collection. From everyday makeup staples to luxurious skincare,
          everything you need is right here.
        </p>

        <p>
          Explore foundations, lipsticks, mascaras and more in shades that match
          every mood and moment. Our skincare range includes cleansers, serums and
          moisturizers for glowing skin.
        </p>

        <p>
          Whether you're refreshing your routine or trying something new, our beauty
          range has you covered all year round.
        </p>

        <div className="beauty-breadcrumb">
          VOGUECART.COM / <span>BEAUTY</span>
        </div>
      </div>

      <footer className="beauty-footer">
        <div className="beauty-footer-top">
          <div className="beauty-footer-col">
            <h4>Shop</h4>
            <ul>
              <li>LADIES</li>
              <li>MEN</li>
              <li>KIDS</li>
              <li>HOME</li>
              <li>BEAUTY</li>
            </ul>
          </div>

          <div className="beauty-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li>CAREERS</li>
              <li>ABOUT VOGUECART</li>
              <li>SUSTAINABILITY</li>
              <li>PRESS</li>
              <li>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="beauty-footer-col">
            <h4>Help</h4>
            <ul>
              <li>CUSTOMER SERVICE</li>
              <li>MY ACCOUNT</li>
              <li>FIND A STORE</li>
              <li>LEGAL & PRIVACY</li>
              <li>CONTACT</li>
            </ul>
          </div>

          <div className="beauty-footer-col beauty-footer-news">
            <p>
              Sign up now and be the first to know about exclusive beauty launches
              and offers!
            </p>
            <span className="beauty-read-more">READ MORE</span>
          </div>
        </div>

        <div className="beauty-footer-bottom">
          <div className="beauty-footer-left">
            <div className="beauty-footer-brand">VOGUECART</div>
            <p className="beauty-region">
              INDIA (Rs.) <span>CHANGE REGION</span>
            </p>
            <p className="beauty-copyright">
              © VOGUECART
            </p>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Beauty;
