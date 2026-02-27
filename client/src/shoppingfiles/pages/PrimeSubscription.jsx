import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePrimeStatus } from "../Redux/AuthSlice";
import { FiArrowLeft } from "react-icons/fi";
import ScrollStack, { ScrollStackItem } from "../components/ui/ScrollStack";
import "./PrimeSubscription.css";

const PrimeSubscription = () => {
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const { user, isPrime } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const plans = {
        monthly: {
            name: "Monthly",
            price: "₹149",
            period: "/ month",
            features: [
                "Free Shipping on all orders",
                "Exclusive Prime Deals",
                "Early access to sales",
                "Dedicated Customer Support"
            ]
        },
        quarterly: {
            name: "Quarterly",
            price: "₹399",
            period: "/ 3 months",
            features: [
                "Everything in Monthly",
                "Extra 5% discount on all orders",
                "Priority Delivery",
                "Zero Convenience Fee"
            ]
        },
        annual: {
            name: "Annual",
            price: "₹1299",
            period: "/ year",
            features: [
                "Everything in Quarterly",
                "Free Monthly Style Consultation",
                "Birthday Special Gift",
                "Exclusive access to VOGUE Events"
            ],
            popular: true
        }
    };

    const handleSubscribe = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        // In a real app, this would involve a payment gateway
        dispatch(updatePrimeStatus(true));
        // Remove alert and navigate home to show the new welcome notification
        sessionStorage.removeItem('hasSeenPrimeWelcome'); // Reset to ensure it shows
        navigate("/");
    };

    return (
        <div className="prime-subscription-container">
            <button className="prime-back-btn" onClick={() => navigate(-1)}>
                <FiArrowLeft />
            </button>
            <header className="prime-header">
                <div className="prime-logo">VOGUE<span>PRIME</span></div>
                <h1>Elevate Your Shopping Experience</h1>
                <p>Join the elite circle and enjoy exclusive benefits tailored just for you.</p>
            </header>

            <div className="plans-grid">
                {Object.keys(plans).map((key) => (
                    <div
                        key={key}
                        className={`plan-card ${selectedPlan === key ? 'selected' : ''} ${plans[key].popular ? 'popular' : ''}`}
                        onClick={() => setSelectedPlan(key)}
                    >
                        {plans[key].popular && <span className="popular-badge">MOST POPULAR</span>}
                        <h3>{plans[key].name}</h3>
                        <div className="price-tag">
                            <span className="amount">{plans[key].price}</span>
                            <span className="period">{plans[key].period}</span>
                        </div>
                        <ul className="feature-list">
                            {plans[key].features.map((feature, index) => (
                                <li key={index}><i className="fas fa-check"></i> {feature}</li>
                            ))}
                        </ul>
                        <button
                            className="subscribe-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlan(key);
                                handleSubscribe();
                            }}
                        >
                            {isPrime ? "Manage Plan" : "Get Prime Now"}
                        </button>
                    </div>
                ))}
            </div>

            <section className="prime-stack-section">
                <h2 className="stack-title">THE PRIME ADVANTAGE</h2>
                <ScrollStack>
                    <ScrollStackItem>
                        <span className="badge">EXPRESS SHIPPING</span>
                        <h2>Unmatched Speed</h2>
                        <p>Receive your orders in record time with our priority logistics network. Zero delivery charges on every single order.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <span className="badge">CURATED CONTENT</span>
                        <h2>Elite Access</h2>
                        <p>Unlock limited-edition collections and early designer drops before they reach the general public.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <span className="badge">VIP PRICING</span>
                        <h2>Permanent Luxury</h2>
                        <p>Enjoy up to 20% membership discount across all premium categories and zero convenience fees on checkout.</p>
                    </ScrollStackItem>
                    <ScrollStackItem>
                        <span className="badge">CONCIERGE</span>
                        <h2>24/7 VIP Support</h2>
                        <p>Your personal style assistant and customer care team are just a tap away, day or night.</p>
                    </ScrollStackItem>
                </ScrollStack>
            </section>
        </div>
    );
};

export default PrimeSubscription;
