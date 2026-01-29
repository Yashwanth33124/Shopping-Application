import React from "react";
import "./DealShowcase.css";
import TextType from "../Texttype/Text";
import heroImg from "../../assets/Bigimage.jpg"; // ✅ make sure this exists

const DealShowcase = () => {
  return (
    <section className="deal-showcase">
      {/* BACKGROUND IMAGE */}
      <img
        src={heroImg}
        alt="Lifestyle shopping"
        className="deal-bg"
      />

      {/* TEXT CONTENT */}
      <div className="deal-content">
        <TextType
          as="h1"
          className="mall-text"
          text={[
            "Discover Premium Styles",
            "Big Brands. Bigger Savings.",
            "Shop Smarter. Live Better."
          ]}
          typingSpeed={45}
          pauseDuration={1500}
          startOnVisible={true}
        />
      </div>
    </section>
  );
};

export default DealShowcase;
