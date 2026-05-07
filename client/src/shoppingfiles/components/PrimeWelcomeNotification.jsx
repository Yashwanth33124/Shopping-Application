import React, { useCallback, useEffect, useState } from "react";
import "./PrimeWelcomeNotification.css";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { m as M, AnimatePresence } from "framer-motion";

const PrimeWelcomeNotification = ({ show, onClose }) => {
    const [isMounted, setIsMounted] = useState(false);

    const handleClose = useCallback(() => {
        setIsMounted(false);
        setTimeout(onClose, 500);
    }, [onClose]);

    useEffect(() => {
        if (show) {
            const mountTimer = setTimeout(() => setIsMounted(true), 0);
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            return () => {
                clearTimeout(mountTimer);
                clearTimeout(timer);
            };
        }
    }, [handleClose, show]);

    return (
        <AnimatePresence>
            {isMounted && (
                <M.div
                    className="prime-notif-container"
                    initial={{ opacity: 0, x: -100, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                >
                    <div className="prime-notif-card">
                        <div className="prime-glow"></div>
                        <div className="prime-notif-content">
                            <div className="prime-icon-wrapper">
                                <FiCheckCircle className="prime-check-icon" />
                            </div>
                            <div className="prime-text-section">
                                <h3 className="prime-title">Welcome to the <span className="prime-brand">Prime Circle</span></h3>
                                <p className="prime-msg">You've unlocked the ultimate shopping experience. Enjoy your exclusive privileges.</p>
                            </div>
                            <button className="prime-close-btn" onClick={handleClose}>
                                <FiX />
                            </button>
                        </div>
                        <div className="prime-progress-bar"></div>
                    </div>
                </M.div>
            )}
        </AnimatePresence>
    );
};

export default PrimeWelcomeNotification;
