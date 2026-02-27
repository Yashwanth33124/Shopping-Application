import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePrimeStatus } from "../Redux/AuthSlice";
import { FiArrowLeft } from "react-icons/fi";
import ScrollStack, { ScrollStackItem } from "../components/ui/ScrollStack";
import "./PrimeSubscription.css";

const PrimeSubscription = () => {
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const [showPayment, setShowPayment] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
    const { user, isPrime, primePlan } = useSelector((state) => state.auth);
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

    const handleProceedToPayment = (key) => {
        if (!user) {
            navigate("/login");
            return;
        }
        setSelectedPlan(key);
        setShowPayment(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConfirmPayment = () => {
        dispatch(updatePrimeStatus({ isPrime: true, plan: plans[selectedPlan].name }));
        if (user) {
            const storageKey = `hasSeenPrimeWelcome_${user.email || 'user'}`;
            localStorage.removeItem(storageKey);
        }
        setShowPayment(false);
        // We can show a small success state or just redirect
        navigate("/");
    };

    if (showPayment) {
        return (
            <div className="prime-payment-wrapper">
                <button className="prime-back-btn" onClick={() => setShowPayment(false)}>
                    <FiArrowLeft />
                </button>
                <div className="prime-payment-content">
                    <div className="member-logo">VOGUE<span>PRIME</span></div>
                    <h1>Membership Payment</h1>
                    <p className="payment-plan-desc">You are subscribing to the <strong>{plans[selectedPlan].name}</strong> plan for <strong>{plans[selectedPlan].price}</strong></p>

                    <div className="prime-payment-form">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    value={cardDetails.expiry}
                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="password"
                                    placeholder="***"
                                    value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                />
                            </div>
                        </div>
                        <button className="prime-pay-btn" onClick={handleConfirmPayment}>
                            AUTHORIZE PAYMENT {plans[selectedPlan].price}
                        </button>
                        <p className="secure-text"><i className="fas fa-lock"></i> Secure SSL Encrypted Gateway</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="prime-subscription-container">
            <button className="prime-back-btn" onClick={() => navigate(-1)}>
                <FiArrowLeft />
            </button>
            <header className="prime-header">
                <div className="prime-logo">VOGUE<span>PRIME</span></div>
                {isPrime ? (
                    <>
                        <h1>Welcome to the Inner Circle</h1>
                        <p>You are currently an active member with the <strong>{primePlan}</strong> plan.</p>
                        <div className="active-status-badge">ACTIVE MEMBER</div>
                    </>
                ) : (
                    <>
                        <h1>Elevate Your Shopping Experience</h1>
                        <p>Join the elite circle and enjoy exclusive benefits tailored just for you.</p>
                    </>
                )}
            </header>

            <div className="plans-grid">
                {Object.keys(plans).map((key) => {
                    const isCurrentPlan = isPrime && primePlan === plans[key].name;
                    return (
                        <div
                            key={key}
                            className={`plan-card ${selectedPlan === key ? 'selected' : ''} ${plans[key].popular ? 'popular' : ''} ${isCurrentPlan ? 'is-active-plan' : ''}`}
                            onClick={() => !isPrime && setSelectedPlan(key)}
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
                                className={`subscribe-btn ${isCurrentPlan ? 'active-plan-btn' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProceedToPayment(key);
                                }}
                            >
                                {isCurrentPlan ? "MANAGE PLAN" : isPrime ? "UPGRADE / SWITCH" : "GET PRIME NOW"}
                            </button>
                        </div>
                    );
                })}
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
