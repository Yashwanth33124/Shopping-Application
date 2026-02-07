import React, { useEffect, useRef } from "react";
import "./Men.css";
import menRouterImg from "../../../public/images/MENROUTER.jpg";

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
          <img src={menRouterImg} alt="Men Fashion" />
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
            <img src="/images/m1.avif" alt="Denim Collection" />
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
            <video src="/images/mv.webm" autoPlay muted loop playsInline />
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
              <img src={`/images2/d${i + 1}.avif`} alt={`Product ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>
      <div class="hm-container">
        <div class="hm-row">
          <div class="hm-item">
            <img src="/images3/a1.jpg" alt="a1" />
            <div class="hm-details">
              <span class="category">TEES</span>
              <span class="explore">EXPLORE</span>
            </div>
          </div>
          <div class="hm-item">
            <img src="/images3/a2.jpg" alt="a2" />
            <div class="hm-details">
              <span class="category">SWEATPANTS</span>
              <span class="explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div class="hm-row">
          <div class="hm-item">
            <img src="/images3/a3.jpg" alt="a3" />
            <div class="hm-details">
              <span class="category">OUTERWEAR</span>
              <span class="explore">EXPLORE</span>
            </div>
          </div>
          <div class="hm-item">
            <img src="/images3/a4.jpeg" alt="a4" />
            <div class="hm-details">
              <span class="category">TAILORING</span>
              <span class="explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="men-fulltext">
        <h2>MEN'S CLOTHING</h2>

        <p>
          Check out all the freshest styles your closet needs in our men's clothing
          range. You'll find a roundup of everyday essentials, including tops and
          T-Shirts, as well as comfy lounge sets and underwear. Formal event coming up?
          Scroll no further than our men's blazers and suits for the sharpest looks and
          nail the dress code.
        </p>

        <p>
          When it comes to men's pants, there's chinos, joggers and cargo styles in all
          the staple colors. Dreaming of denim? Our men's jeans offer a range of fits to
          suit your style, including skinny, straight and tapered, to name just a few.
          Wear yours with a trendy oversized shirt or a classic denim number from our
          men's shirts edit.
        </p>

        <p>
          And when it comes to chilly weather, our men's jackets and coats have you
          covered — we've got puffer jackets and trench coats, as well as leather
          jackets and bomber jackets in year-round colors.
        </p>

        <div className="men-breadcrumb">
          VOGUECART.COM / <span>MEN</span>
        </div>
      </div>
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
              <li>CORPORATE GOVERNANCE</li>
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
              <li>SECURE SHOPPING</li>
              <li>COOKIE NOTICE</li>
              <li>COOKIE SETTINGS</li>
            </ul>
          </div>

          <div className="men-footer-col men-footer-news">
            <p>
              Sign up now and be the first to know about exclusive offers, latest
              fashion news & style tips!
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
              The content of this site is copyright-protected and is the property of
              VOGUECART & Mauritz AB.
            </p>
          </div>

          <div className="men-footer-social">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-spotify"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-facebook"></i>
          </div>
        </div>
      </footer>



    </>
  );
};

export default Men;
