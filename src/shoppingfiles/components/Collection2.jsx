import React, { useRef } from "react";
import "./Collection2.css";

// IMAGES
import MEN1 from "../../assets/MEN1.jpg";
import MEN2 from "../../assets/MEN2.jpg";
import MEN3 from "../../assets/MEN3.jpg";
import MEN4 from "../../assets/MEN4.jpg";
import MEN5 from "../../assets/MEN5.jpeg";

import WOMAN1 from "../../assets/WOMAN1.jpg";
import WOMAN2 from "../../assets/WOMAN2.jpg";
import WOMAN3 from "../../assets/WOMAN3.jpg";
import WOMAN4 from "../../assets/WOMAN4.jpg";
import WOMAN5 from "../../assets/WOMAN5.jpg";

import CHILD1 from "../../assets/CHILD1.jpg";
import CHILD2 from "../../assets/CHILD2.jpg";

const Collection2 = () => {
  const sliderRef = useRef(null);

  const items = [
    { img: MEN1, name: "ALLEN SOLLY", offer: "Buy 1 Get 1 Free" },
    { img: WOMAN1, name: "VAN HEUSEN", offer: "Buy 1 Get 1 Free" },
    { img: CHILD1, name: "AMERICAN EAGLE", offer: "Buy 1 Get 1 Free" },
    { img: MEN2, name: "CELIO", offer: "Buy 2 at 50%" },

    { img: WOMAN2, name: "U.S. POLO ASSN", offer: "Buy 1 Get 1 Free" },
    { img: MEN3, name: "LEVI'S", offer: "Buy 2 at 40%" },
    { img: WOMAN3, name: "ONLY", offer: "Flat 40% Off" },
    { img: CHILD2, name: "MAX", offer: "Buy 1 Get 1 Free" },

    { img: MEN4, name: "TOMMY HILFIGER", offer: "Flat 50% Off" },
    { img: WOMAN4, name: "BIBA", offer: "Buy 1 Get 1 Free" },
    { img: MEN5, name: "PETER ENGLAND", offer: "Flat 60% Off" },
    { img: WOMAN5, name: "FOREVER 21", offer: "Buy 2 at 40%" },
  ];

  const CARD_WIDTH = 260 + 30; // card + gap

  // ⬅️➡️ Arrow scroll (4 cards)
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -(CARD_WIDTH * 4),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: CARD_WIDTH * 4,
      behavior: "smooth",
    });
  };

  return (
    <section className="collection2-section">
      <div className="collection2-wrapper">
        <button className="c2-nav left" onClick={scrollLeft}>
          &#10094;
        </button>

        <div className="collection2-row" ref={sliderRef}>
          {items.map((item, i) => (
            <div className="collection2-card" key={i}>
              <div className="circle-img">
                <img src={item.img} alt={item.name} />
              </div>

              <div className="brand-pill">{item.name}</div>
              <p className="offer-text">{item.offer}</p>
            </div>
          ))}
        </div>

        <button className="c2-nav right" onClick={scrollRight}>
          &#10095;
        </button>
      </div> {/* ✅ MISSING DIV FIXED */}
    </section>
  );
};

export default Collection2;
