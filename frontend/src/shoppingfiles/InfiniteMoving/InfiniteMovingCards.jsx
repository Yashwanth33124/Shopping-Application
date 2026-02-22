import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[28rem] flex items-center justify-center overflow-hidden bg-white">
      <InfiniteMovingCards
        items={fashionItems}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

const fashionItems = [
  {
    image: "/images/dress1.jpg",
    title: "Summer Wear",
  },
  {
    image: "/images/dress2.jpg",
    title: "Party Wear",
  },
  {
    image: "/images/dress3.jpg",
    title: "Casual Wear",
  },
  {
    image: "/images/dress4.jpg",
    title: "Ethnic Wear",
  },
];
