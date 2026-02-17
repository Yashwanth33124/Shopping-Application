import React, { useEffect, useRef } from "react";
import { getImgUrl } from "../../utils/imagePath";

import "./DealShowcase.css";

const sections = [
  {
    title: "WOMEN",
    subtitle: "Modern elegance for everyday icons",
    image: getImgUrl("/image7/home1.webp"),
  },
  {
    title: "MEN",
    subtitle: "Tailored confidence. Refined style",
    image: getImgUrl("/image7/home2.avif"),
  },
  {
    title: "BEAUTY",
    subtitle: "Minimal. Clean. Powerful",
    image: getImgUrl("/image7/home3.avif"),
  },
  {
    title: "KIDS",
    subtitle: "Comfort meets playful design",
    image: getImgUrl("/image7/home4.jpg"),
  },
  {
    title: "VOGUECART",
    subtitle: "Fashion that defines you",
    image: getImgUrl("/image7/home5.jpg"),
  },
];

const DealShowcase = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-magazine">
      {sections.map((sec, i) => (
        <section
          key={i}
          className="mag-section"
          ref={(el) => (sectionsRef.current[i] = el)}
        >
          <div className="mag-inner">
            <div className="mag-text">
              <h1>{sec.title}</h1>
              <p>{sec.subtitle}</p>
              <span className="mag-cta">EXPLORE</span>
            </div>

            <div className="mag-image">
              <img src={sec.image} alt={sec.title} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default DealShowcase;
