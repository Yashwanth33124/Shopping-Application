import React, { useCallback, useEffect } from "react";
import "./CartNotification.css";
import { useNavigate } from "react-router-dom";

const CartNotification = ({ product, show, onClose }) => {
    const [isClosing, setIsClosing] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMounted(false);
            onClose();
        }, 500); // Wait for transition
    }, [onClose]);

    useEffect(() => {
        if (show) {
            const mountTimer = setTimeout(() => {
                setIsMounted(true);
                setIsClosing(false);
            }, 0);
            const timer = setTimeout(() => {
                handleClose();
            }, 2500); // 2 to 3 seconds as requested
            return () => {
                clearTimeout(mountTimer);
                clearTimeout(timer);
            };
        }
    }, [handleClose, show]);

    const handleCardClick = () => {
        navigate("/cart");
        handleClose();
    };

    if (!isMounted && !show) return null;

    const displayProduct = product || {};

    return (
        <div className={`cart-notification-container ${show && !isClosing ? "active" : "leaving"}`}>
            <div
                className="cart-notification-card"
                onClick={handleCardClick}
            >
                <div className="notif-body">
                    <div className="notif-image-section">
                        <img src={displayProduct.image} alt={displayProduct.title} />
                    </div>
                    <div className="notif-info-section">
                        <h3 className="notif-product-title">{displayProduct.title}</h3>
                        <p className="notif-product-price">Rs. {displayProduct.price}</p>

                        <div className="notif-specs">
                            <div className="notif-spec-item">
                                <span className="spec-label">Colour</span>
                                <span className="spec-value">{displayProduct.color || "Default"}</span>
                            </div>
                            <div className="notif-spec-item">
                                <span className="spec-label">Size</span>
                                <span className="spec-value">{displayProduct.size || "S"}</span>
                            </div>
                            <div className="notif-spec-item">
                                <span className="spec-label">Quantity</span>
                                <span className="spec-value">{displayProduct.quantity || 1}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartNotification;
