import React, { useState } from "react";
import "./infinite.css";

export function InfiniteMovingCards({ items }) {
  const [active, setActive] = useState(null);

  return (
    <>
      {/* SLIDER */}
      <div className="slider">
        <div className="slide-track">
          {items.concat(items).map((item, index) => (
            <div
              className="slide"
              key={index}
              onClick={() => setActive(item)}
            >
              <img src={item.image} alt={item.brand} />
              <div className="brand-overlay">{item.brand}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {active && (
        <div className="modal" onClick={() => setActive(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setActive(null)}>✕</button>
            <img src={active.image} alt={active.brand} />
            <p>{active.brand}</p>
          </div>
        </div>
      )}
    </>
  );
}
