import React, { useEffect } from "react";
import "./CartNotification.css";
import { FiX } from "react-icons/fi";

const CartNotification = ({ product, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show || !product) return null;

    return (
        <div className="cart-notification-container">
            <div className="cart-notification-card">
                <button className="notif-close-btn" onClick={onClose}>
                    +
                </button>
                <div className="notif-body">
                    <div className="notif-image-section">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="notif-info-section">
                        <h3 className="notif-product-title">{product.title}</h3>
                        <p className="notif-product-price">₹ {product.price}</p>

                        <div className="notif-specs">
                            <div className="notif-spec-item">
                                <span className="spec-label">Color</span>
                                <span className="spec-value">{product.color || "Standard"}</span>
                            </div>
                            <div className="notif-spec-item">
                                <span className="spec-label">Size</span>
                                <span className="spec-value">{product.size || "S"}</span>
                            </div>
                            <div className="notif-spec-item">
                                <span className="spec-label">Quantity</span>
                                <span className="spec-value">{product.quantity || 1}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartNotification;
