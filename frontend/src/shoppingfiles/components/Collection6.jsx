import React from "react";
import { getImgUrl } from "../../utils/imagePath";
import "./Collection6.css";

import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

export default function Collection6() {
  const items = [
    { image: getImgUrl("/images/MENDRESS1.jpg"), brand: "CLASSICO" },
    { image: getImgUrl("/images/WOMANDRESS1.jpg"), brand: "LUXE WEAR" },

    { image: getImgUrl("/images/MENDRESS2.jpg"), brand: "URBAN FIT" },
    { image: getImgUrl("/images/WOMANDRESS2.jpg"), brand: "ELEGANCE" },

    { image: getImgUrl("/images/MENDRESS3.jpg"), brand: "MODERN MAN" },
    { image: getImgUrl("/images/WOMANDRESS3.jpg"), brand: "VOGUE" },

    { image: getImgUrl("/images/MENDRESS4.jpg"), brand: "ELITE" },
    { image: getImgUrl("/images/WOMANDRESS4.jpg"), brand: "GLAMORA" },
  ];

  return (
    <div className="collection6-container">
      <h2 className="collection6-title">
        Fashion Collection
      </h2>

      <InfiniteMovingCards items={items} />
    </div>
  );
}
