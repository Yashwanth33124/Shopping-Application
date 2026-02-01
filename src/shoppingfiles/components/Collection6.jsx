import React from "react";
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

export default function Collection6() {
  const items = [
    { image: "/images/MENDRESS1.jpg", brand: "CLASSICO" },
    { image: "/images/WOMANDRESS1.jpg", brand: "LUXE WEAR" },

    { image: "/images/MENDRESS2.jpg", brand: "URBAN FIT" },
    { image: "/images/WOMANDRESS2.jpg", brand: "ELEGANCE" },

    { image: "/images/MENDRESS3.jpg", brand: "MODERN MAN" },
    { image: "/images/WOMANDRESS3.jpg", brand: "VOGUE" },

    { image: "/images/MENDRESS4.jpg", brand: "ELITE" },
    { image: "/images/WOMANDRESS4.jpg", brand: "GLAMORA" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Fashion Collection
      </h2>

      <InfiniteMovingCards items={items} />
    </div>
  );
}
