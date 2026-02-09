import React, { useEffect, useRef } from "react";
import "./child.css";

const Child = () => {
  const cardsRef = useRef([]);

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
        <video src="/image8/kidvideo.mp4" autoPlay loop muted playsInline />
      </section>

      {/* ===== FEATURE IMAGES ===== */}
      <section className="child-images">
        {[
          { img: "/image8/kid1.avif", title: "Playful Denim", price: "₹1,999" },
          { img: "/image8/kid2.avif", title: "Everyday Comfort", price: "₹2,499" },
        ].map((item, i) => (
          <div
            className="child-image-card"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <img src={item.img} alt={item.title} />
            <div className="image-overlay">
              <h2>{item.title}</h2>
              <p>{item.price}</p>
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
          ].map((img, i) => (
            <div className="child-product-card" key={i}>
              <img src={`/images9/${img}`} alt={`Child Product ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHILD CATEGORY GRID ===== */}
      <div className="hm-container">
        <div className="hm-row">
          <div className="hm-item">
            <img src="/images9/k11.jpg" alt="Tees" />
            <div className="hm-details">
              <span className="category">TEES</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hm-item">
            <img src="/images9/k12.jpg" alt="Bottomwear" />
            <div className="hm-details">
              <span className="category">BOTTOMWEAR</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="hm-row">
          <div className="hm-item">
            <img src="/images9/k13.jpg" alt="Outerwear" />
            <div className="hm-details">
              <span className="category">OUTERWEAR</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>

          <div className="hm-item">
            <img src="/images9/k14.jpg" alt="Sets" />
            <div className="hm-details">
              <span className="category">SETS</span>
              <span className="explore">EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
      {/* TEXT SECTION */}
      <div className="men-fulltext">
        <h2>CHILDREN'S CLOTHING</h2>

        <p>
          Discover playful, comfortable, and stylish clothing for kids of all ages.
          Our children's clothing collection is designed for everyday adventures,
          from school days to weekend fun.
        </p>

        <p>
          Explore a wide range of essentials including T-shirts, sweatshirts, dresses,
          and bottoms made with soft fabrics that are gentle on young skin and easy
          to move in.
        </p>

        <p>
          From cozy outerwear to matching sets and seasonal favorites, our kidswear
          is crafted to keep them comfortable, confident, and ready for anything.
        </p>

        <div className="men-breadcrumb">
          VOGUECART.COM / <span>CHILD</span>
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
              <li>CAREERS</li>
              <li>ABOUT VOGUECART</li>
              <li>SUSTAINABILITY</li>
              <li>PRESS</li>
              <li>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="men-footer-col">
            <h4>Help</h4>
            <ul>
              <li>CUSTOMER SERVICE</li>
              <li>MY ACCOUNT</li>
              <li>FIND A STORE</li>
              <li>LEGAL & PRIVACY</li>
              <li>CONTACT</li>
            </ul>
          </div>

          <div className="men-footer-col men-footer-news">
            <p>
              Join VogueCart Kids and get updates on new arrivals, special collections,
              and exclusive offers.
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


    </div>
  );
};

export default Child;
