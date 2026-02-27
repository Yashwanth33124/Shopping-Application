import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiLock, FiPlus } from "react-icons/fi";
import { cartActions } from "../Redux/CartSlice";
import "./Checkout.css";

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const Checkout = () => {
    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { user, isPrime, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [orderStep, setOrderStep] = useState("form"); // "form" -> "payment" -> "success"
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "cod"

    const [formData, setFormData] = useState({
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        email: user?.email || "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        building: ""
    });

    const [cardData, setCardData] = useState({
        number: "",
        expiry: "",
        cvv: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (cartItems.length === 0 && orderStep !== "success") {
            navigate("/cart");
        }
    }, [cartItems, navigate, orderStep]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.address) newErrors.address = "Please enter an address";
        if (!formData.city) newErrors.city = "Enter a town/city";
        if (!formData.pincode) newErrors.pincode = "Please enter a pincode";
        if (!formData.state) newErrors.state = "Please select a province";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsAddressSaved(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleProceedToPayment = () => {
        if (isAddressSaved) {
            setOrderStep("payment");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCompletePurchase = () => {
        setOrderStep("success");
        setTimeout(() => {
            dispatch(cartActions.clearCart());
        }, 1000);
    };

    const shippingFee = (cartItems.length > 0 && !isPrime) ? 499 : 0;
    const primeDiscount = isPrime ? Math.round(totalAmount * 0.1) : 0;
    const finalTotal = totalAmount + shippingFee - primeDiscount;

    // --- SUCCESS VIEW ---
    if (orderStep === "success") {
        return (
            <div className="order-success-container">
                <div className="success-content">
                    <div className="success-icon-wrapper">
                        <FiCheckCircle />
                    </div>
                    <h1 className="success-title-unique">ORDER CONFIRMED</h1>
                    <div className="success-divider"></div>
                    <p className="success-msg">Your VOGUE selection is now being prepared for departure.</p>
                    <div className="order-details-summary">
                        <p>Order ID: <span>#VC-{Math.floor(1000000 + Math.random() * 9000000)}</span></p>
                        <p>Total Paid: <span>Rs. {finalTotal.toLocaleString('en-IN')}.00</span></p>
                        <p>Delivery to: <span>{formData.city}, {formData.state}</span></p>
                    </div>
                    <button className="back-to-shop-btn" onClick={() => navigate("/")}>
                        RETURN TO STORE
                    </button>
                </div>
            </div>
        );
    }

    // --- PAYMENT VIEW ---
    if (orderStep === "payment") {
        return (
            <div className="checkout-page-container payment-step-active">
                <div className="checkout-top-nav">
                    <button className="back-link" onClick={() => setOrderStep("form")}>
                        <FiArrowLeft /> BACK TO DELIVERY
                    </button>
                    <div className="checkout-logo">VOGUECART</div>
                </div>

                <div className="checkout-layout">
                    <div className="checkout-main-content">
                        <h1 className="checkout-title">PAYMENT</h1>

                        <div className="payment-options-container">
                            {/* Card Option */}
                            <div
                                className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <div className="payment-method-header">
                                    <div className="radio-circle"></div>
                                    <h3>CREDIT / DEBIT CARD</h3>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="card-form-nested">
                                        <div className="form-group">
                                            <label>Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                name="number"
                                                value={cardData.number}
                                                onChange={handleCardChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Expiry Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM / YY"
                                                    name="expiry"
                                                    value={cardData.expiry}
                                                    onChange={handleCardChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>CVV</label>
                                                <input
                                                    type="password"
                                                    placeholder="***"
                                                    name="cvv"
                                                    value={cardData.cvv}
                                                    onChange={handleCardChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* COD Option */}
                            <div
                                className={`payment-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <div className="payment-method-header">
                                    <div className="radio-circle"></div>
                                    <h3>PAY AFTER DELIVERY (COD)</h3>
                                </div>
                                {paymentMethod === 'cod' && (
                                    <div className="cod-info-nested">
                                        <p>Pay with cash or UPI when your parcel arrives at your doorstep.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="billing-address-summary">
                            <h2 className="section-title">BILLING ADDRESS</h2>
                            <p>Same as delivery address</p>
                            <div className="address-preview-box">
                                {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                            </div>
                        </div>

                        <button className="confirm-order-btn" onClick={handleCompletePurchase}>
                            PLACE ORDER & PAY
                        </button>
                    </div>

                    <aside className="checkout-summary-sidebar">
                        <div className="summary-sticky-box">
                            <div className="simplified-summary">
                                <div className="summary-row total-row">
                                    <span className="total-label">TOTAL TO PAY</span>
                                    <span className="total-value">Rs. {finalTotal.toLocaleString('en-IN')}.00</span>
                                </div>
                                <div className="parcel-preview-mini">
                                    <p>{cartItems.length} Items in your parcel</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

    // --- FORM VIEW (DEFAULT) ---
    return (
        <div className="checkout-page-container">
            <div className="checkout-top-nav">
                <button className="back-link" onClick={() => navigate("/cart")}>
                    <FiArrowLeft /> BACK TO SHOPPING BAG
                </button>
                <div className="checkout-logo">VOGUECART</div>
            </div>

            <div className="checkout-layout">
                {/* LEFT COLUMN */}
                <div className="checkout-main-content">
                    <h1 className="checkout-title">CHECKOUT</h1>

                    {/* MY INFORMATION */}
                    <section className="checkout-section">
                        <div className="section-header">
                            <h2>MY INFORMATION</h2>
                            {!isAddressSaved && <button className="edit-link">EDIT</button>}
                        </div>
                        <div className="user-info-display">
                            <p>{formData.firstName} {formData.lastName}</p>
                            <p>{formData.email}</p>
                        </div>
                    </section>

                    {/* DELIVERY */}
                    <section className="checkout-section">
                        <div className="section-header">
                            <h2 className="section-title">DELIVERY</h2>
                            {isAddressSaved && (
                                <button className="edit-link" onClick={() => setIsAddressSaved(false)}>EDIT ADDRESS</button>
                            )}
                        </div>

                        {!isAddressSaved ? (
                            <form className="checkout-form" onSubmit={handleSaveAddress}>
                                <div className="form-row">
                                    <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
                                        <label>First name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        {errors.firstName && <span className="error-text">! {errors.firstName}</span>}
                                    </div>
                                    <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
                                        <label>Last name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        {errors.lastName && <span className="error-text">! {errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className={`form-group ${errors.address ? 'has-error' : ''}`}>
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    {errors.address && <span className="error-text">! {errors.address}</span>}
                                </div>

                                <div className="add-more-link">
                                    <span>ADD BUILDING, FLOOR, APT, COMPANY, C/O, SUITE</span>
                                    <FiPlus className="plus-icon" />
                                </div>

                                <div className={`form-group ${errors.city ? 'has-error' : ''}`}>
                                    <label>Town/City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                    {errors.city && <span className="error-text">! {errors.city}</span>}
                                </div>

                                <div className="form-row">
                                    <div className={`form-group ${errors.pincode ? 'has-error' : ''}`}>
                                        <label>Pincode *</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder="400070"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                        />
                                        {errors.pincode && <span className="error-text">! {errors.pincode}</span>}
                                    </div>

                                    <div className={`form-group ${errors.state ? 'has-error' : ''}`}>
                                        <label>State *</label>
                                        <select name="state" value={formData.state} onChange={handleChange}>
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        {errors.state && <span className="error-text">! {errors.state}</span>}
                                    </div>
                                </div>

                                <div className="market-indicator">
                                    <p className="market-label">MARKET</p>
                                    <p className="market-value">INDIA</p>
                                </div>

                                <button type="submit" className="save-form-btn">SAVE ADDRESS</button>
                            </form>
                        ) : (
                            <div className="saved-address-summary">
                                <p>{formData.firstName} {formData.lastName}</p>
                                <p>{formData.address}</p>
                                <p>{formData.city}, {formData.pincode}</p>
                                <p>{formData.state}, INDIA</p>
                                <div className="address-badge"><FiCheckCircle /> SAVED</div>
                            </div>
                        )}
                    </section>

                    {/* PARCEL */}
                    <section className="checkout-section">
                        <div className="divider"></div>
                        <h2 className="section-title">PARCEL</h2>
                        <p className="shipped-info">Shipped by VOGUECART</p>

                        <div className="parcel-items-preview">
                            {cartItems.map((item, idx) => (
                                <div className="parcel-item-box" key={idx}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                            ))}
                        </div>
                        <p className="item-count-label">{cartItems.length} ITEMS</p>
                    </section>
                </div>

                {/* RIGHT COLUMN - STICKY SUMMARY */}
                <aside className="checkout-summary-sidebar">
                    <div className="summary-sticky-box">
                        <div className="summary-row space-between">
                            <span>DISCOUNTS</span>
                            <button className="add-btn">ADD</button>
                        </div>

                        <div className="summary-details">
                            <div className="summary-row space-between">
                                <span>Order value</span>
                                <span>Rs. {totalAmount.toLocaleString('en-IN')}.00</span>
                            </div>
                            <div className="summary-row space-between">
                                <span>Delivery Fee</span>
                                <span>{shippingFee === 0 ? "Free" : `Rs. ${shippingFee}.00`}</span>
                            </div>
                            {isPrime && (
                                <div className="summary-row space-between prime-discount">
                                    <span>Prime Savings</span>
                                    <span>- Rs. {primeDiscount.toLocaleString('en-IN')}.00</span>
                                </div>
                            )}
                        </div>

                        <div className="summary-row space-between total-row">
                            <span className="total-label">TOTAL</span>
                            <span className="total-value">Rs. {finalTotal.toLocaleString('en-IN')}.00</span>
                        </div>

                        <p className="data-policy-text">
                            By continuing, you agree to VOGUECART's <u>Terms and Conditions</u>.
                        </p>

                        <button
                            className={`complete-purchase-btn ${!isAddressSaved ? 'disabled' : ''}`}
                            onClick={handleProceedToPayment}
                        >
                            PROCEED TO PAYMENT
                        </button>

                        <div className="security-info">
                            <FiLock />
                            <span>Payment data is encrypted and secure.</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
