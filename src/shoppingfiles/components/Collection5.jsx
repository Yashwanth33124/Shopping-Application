import React from "react";
import ScrollVelocity from "../../ScrollVelocity";
import "./Collection5.css";

const Collection5 = () => {
  const brandNames = [
    "MAX • TOMMY HILFIGER • BIBA • PETER ENGLAND • FOREVER 21 • H&M • ZARA • LEVI’S • NIKE • ADIDAS",
    "PUMA • ALLEN SOLLY • U.S. POLO ASSN. • CALVIN KLEIN • ROADSTER • HRX • VAN HEUSEN • ONLY • VERO MODA"
  ];

  return (
    <section className="collection5">
      <ScrollVelocity
        texts={brandNames}
        velocity={120}
        numCopies={8}
      />
    </section>
  );
};

export default Collection5;
