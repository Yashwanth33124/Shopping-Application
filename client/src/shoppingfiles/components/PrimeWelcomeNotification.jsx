import React, { useEffect, useState } from "react";
import "./PrimeWelcomeNotification.css";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const PrimeWelcomeNotification = ({ show, onClose }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    const handleClose = () => {
        setIsMounted(false);
        setTimeout(onClose, 500);
    };

    return (
        <AnimatePresence>
            {isMounted && (
                <motion.div
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
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PrimeWelcomeNotification;
