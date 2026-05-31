import React from "react";
import "./Collection3.css";

import MENVIDEO1 from "../../assets/MENVIDEO1.mp4";
import WOMANVIDEO1 from "../../assets/WOMANVIDEO1.mp4";

const Collection3 = () => {
  return (
    <section className="collection3-section">
      <div className="collection3-wrapper">

        {/* MEN */}
        <div className="video-box">
          <video
            src={MENVIDEO1}
            autoPlay
            muted
            loop
            playsInline
            className="men-video"
          />
          <div className="video-text">
            <h2>Men&apos;s Collection</h2>
            <p>Bold • Confident • Modern</p>
          </div>
        </div>

        {/* WOMEN */}
        <div className="video-box">
          <video
            src={WOMANVIDEO1}
            autoPlay
            muted
            loop
            playsInline
            className="woman-video"
          />
          <div className="video-text">
            <h2>Women&apos;s Collection</h2>
            <p>Elegant • Trendy • Timeless</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Collection3;
