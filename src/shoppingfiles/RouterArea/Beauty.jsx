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

    </div>
  );
};

export default Beauty;
