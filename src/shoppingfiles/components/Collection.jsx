import React, { useRef } from "react";
import "./Collection.css";

// Your image imports
import img1 from "../../assets/img1.avif";
import img2 from "../../assets/img2.avif";
import img3 from "../../assets/img3.avif";
import img4 from "../../assets/img4.avif";
import img5 from "../../assets/img5.avif";
import img6 from "../../assets/img7.jpeg";

const Collection = () => {
  const sliderRef = useRef(null);
  const images = [img1, img2, img3, img4, img5, img6];

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="collection-section">
      <div className="header-container">
        <h2 className="collection-title">Limited Time</h2>
      </div>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={scrollLeft}>&#10094;</button>

        <div className="collection-row" ref={sliderRef}>
          {images.map((img, i) => (
            <div className="collection-card" key={i}>
              <img src={img} alt={`item-${i}`} />
              
              {/* Placement triggers */}
              {i === 0 && <span className="banner-font republic-split">REPUBLIC</span>}
              {i === 2 && <span className="banner-font day-split">DAY</span>}
              {i === 4 && <span className="banner-font sale-split">SALE</span>}
            </div>
          ))}
        </div>

        <button className="nav-btn right" onClick={scrollRight}>&#10095;</button>
      </div>
    </section>
  );
};

export default Collection;