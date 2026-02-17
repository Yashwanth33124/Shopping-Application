import React, { useEffect, useRef } from "react";
import { getImgUrl } from "../../utils/imagePath";

import "./Men.css";

const Men = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const text = card.querySelector(".men2-text");
        if (!text) return;

        const rect = card.getBoundingClientRect();
        const windowH = window.innerHeight;
        const cardH = rect.height;

        const progress = Math.min(
          Math.max((windowH - rect.top) / (windowH + cardH), 0),
          1
        );

        const maxMove = cardH - 120;
        text.style.transform = `translateY(${progress * maxMove}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="men-page">
        <div className="men-hero">
          <img src={getImgUrl("/images/MENROUTER.jpg")} alt="Men Fashion" />
          <h1 className="men-hero-note">
            Classic Styles For <br /> Confident Men
          </h1>
        </div>
      </section>

      {/* IMAGE + VIDEO */}
      <section className="men2-page">
        <div className="men2-media-section">
          {/* IMAGE */}
          <div
            className="men2-media-left"
            ref={(el) => (cardsRef.current[0] = el)}
          >
            <img src={getImgUrl("/images/m1.avif")} alt="Denim Collection" />
            <div className="men2-text">
              <h2>Denim Edit</h2>
              <p>₹ 2,499</p>
            </div>
          </div>

          {/* VIDEO */}
          <div
            className="men2-media-right"
            ref={(el) => (cardsRef.current[1] = el)}
          >
            <video src={getImgUrl("/images/mv.webm")} autoPlay muted loop playsInline />
            <div className="men2-text">
              <h2>Urban Casual</h2>
              <p>₹ 1,999</p>
            </div>
          </div>
        </div>

        <div className="men-editorial-text">
          <h1>
            Built For <br /> Modern Men
          </h1>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="men-products">
        <div className="men-products-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div className="product-card" key={i}>
              <img src={getImgUrl(`/images2/d${i + 1}.avif`)} alt={`Product ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY GRID */}
      <div className="hm-container">
        <div className="hm-row">
          <div className="hm-item">
            <img src={getImgUrl("/images3/a1.png")} alt="a1" />
            <div className="hm-details">
              <span className="category">TEES</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hm-item">
            <img src={getImgUrl("/images3/a2.jpeg")} alt="a2" />
            <div className="hm-details">
              <span className="category">SWEATPANTS</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="hm-row">
          <div className="hm-item">
            <img src={getImgUrl("/images3/a3.jpg")} alt="a3" />
            <div className="hm-details">
              <span className="category">OUTERWEAR</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hm-item">
            <img src={getImgUrl("/images3/a4.jpeg")} alt="a4" />
            <div className="hm-details">
              <span className="category">TAILORING</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="men-fulltext">
        <h2>MEN'S CLOTHING</h2>

        <p>
          Check out all the freshest styles your closet needs in our men's clothing
          range. You'll find a roundup of everyday essentials, including tops and
          T-Shirts, as well as comfy lounge sets and underwear.
        </p>

        <p>
          When it comes to men's pants, there's chinos, joggers and cargo styles in all
          the staple colors. Dreaming of denim? Our men's jeans offer a range of fits.
        </p>

        <p>
          And when it comes to chilly weather, our men's jackets and coats have you
          covered — from puffers to trench coats.
        </p>

        <div className="men-breadcrumb">
          VOGUECART.COM / <span>MEN</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="men-footer">
        <div className="men-footer-top">
          <div className="men-footer-col">
            <h4>Shop</h4>
            <ul>
              <li>LADIES</li>
              <li>MEN</li>
              <li>KIDS</li>
              <li>HOME</li>
              <li>BEAUTY</li>
            </ul>
          </div>

          <div className="men-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li>CAREER AT H&M</li>
              <li>ABOUT H&M GROUP</li>
              <li>SUSTAINABILITY</li>
              <li>PRESS</li>
              <li>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="men-footer-col">
            <h4>Help</h4>
            <ul>
              <li>CUSTOMER SERVICE</li>
              <li>MY H&M</li>
              <li>FIND A STORE</li>
              <li>LEGAL & PRIVACY</li>
              <li>CONTACT</li>
            </ul>
          </div>

          <div className="men-footer-col men-footer-news">
            <p>
              Sign up now and be the first to know about exclusive offers and fashion
              news!
            </p>
            <span className="men-read-more">READ MORE</span>
          </div>
        </div>

        <div className="men-footer-bottom">
          <div className="men-footer-left">
            <div className="men-footer-brand">VOGUECART</div>
            <p className="men-region">
              INDIA (Rs.) <span>CHANGE REGION</span>
            </p>
            <p className="men-copyright">
              © VOGUECART
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Men;
