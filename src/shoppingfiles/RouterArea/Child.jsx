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
    </div>
  );
};

export default Child;
