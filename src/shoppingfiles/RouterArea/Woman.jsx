import React from "react";
import './Woman.css'
const Woman = () => {
  return (
    <div className="woman-page">
      {/* VIDEO SECTION */}
      <div className="woman-video">
        <video
          src="/images4/gv.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* CONTENT */}
      <div className="woman-content">
        woman cards
      </div>
    </div>
  );
};

export default Woman;
