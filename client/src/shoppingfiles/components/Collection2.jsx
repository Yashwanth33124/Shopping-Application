import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import "./Collection2.css";

// TOAST
import Toast from "./Toast";

// IMAGES (unchanged)
import MEN1 from "../../assets/MEN1.jpg";
import MEN2 from "../../assets/MEN2.jpg";
import MEN3 from "../../assets/MEN3.jpg";
import MEN4 from "../../assets/MEN4.jpg";
import MEN5 from "../../assets/MEN5.jpg";

import WOMAN1 from "../../assets/WOMAN1.jpg";
import WOMAN2 from "../../assets/WOMAN2.jpg";
import WOMAN3 from "../../assets/WOMAN3.jpg";
import WOMAN4 from "../../assets/WOMAN4.jpg";
import WOMAN5 from "../../assets/WOMAN5.jpg";

import CHILD1 from "../../assets/CHILD1.jpg";
import CHILD2 from "../../assets/CHILD2.jpg";

const Collection2 = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const items = [
    // ... items array remains the same ...
    { id: 1, img: MEN1, name: "ALLEN SOLLY", offer: "Buy 1 Get 1 Free" },
    { id: 2, img: WOMAN1, name: "VAN HEUSEN", offer: "Buy 1 Get 1 Free" },
    { id: 3, img: CHILD1, name: "AMERICAN EAGLE", offer: "Buy 1 Get 1 Free" },
    { id: 4, img: MEN2, name: "CELIO", offer: "Buy 2 at 50%" },
    { id: 5, img: WOMAN2, name: "U.S. POLO ASSN", offer: "Buy 1 Get 1 Free" },
    { id: 6, img: MEN3, name: "LEVI'S", offer: "Buy 2 at 40%" },
    { id: 7, img: WOMAN3, name: "ONLY", offer: "Flat 40% Off" },
    { id: 8, img: CHILD2, name: "MAX", offer: "Buy 1 Get 1 Free" },
    { id: 9, img: MEN4, name: "TOMMY HILFIGER", offer: "Flat 50% Off" },
    { id: 10, img: WOMAN4, name: "BIBA", offer: "Buy 1 Get 1 Free" },
    { id: 11, img: MEN5, name: "PETER ENGLAND", offer: "Flat 60% Off" },
    { id: 12, img: WOMAN5, name: "FOREVER 21", offer: "Buy 2 at 40%" },
  ];

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, {
      state: {
        product: {
          id: item.id,
          title: item.name,
          image: item.img,
          price: 2499,
          color: "Multiple",
          size: "Standard"
        }
      }
    });
  };

  return (
    <section className="collection2-section">
      {showToast && <Toast text="Added to cart 🛒" />}

      <div className="collection2-row" ref={sliderRef}>
        {items.map((item) => (
          <div
            className="collection2-card"
            key={item.id}
            onClick={() => handleProductClick(item)}
          >
            <div className="circle-img">
              <img src={item.img} alt={item.name} />
            </div>

            <div className="brand-pill">{item.name}</div>
            <p className="offer-text">{item.offer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection2;
