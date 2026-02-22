import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiHeart } from "react-icons/fi";
import "./Cart.css";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const shippingFee = cartItems.length > 0 ? 499 : 0;
    const finalTotal = totalAmount + shippingFee;

    const handleIncrement = (id) => {
        const item = cartItems.find(i => i.id === id);
        dispatch(cartActions.addToCart(item));
    };

    const handleDecrement = (id) => {
        dispatch(cartActions.removeFromCart(id));
    };

    const handleDelete = (id) => {
        dispatch(cartActions.deleteFromCart(id));
    };

    return (
        <div className="cart-page-container">
            <h1 className="cart-page-title">SHOPPING BAG</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <p>Your shopping bag is empty.</p>
                    <button className="continue-shopping-btn" onClick={() => navigate("/")}>
                        CONTINUE SHOPPING
                    </button>
                </div>
            ) : (
                <div className="cart-content-layout">
                    {/* LEFT SIDE: ITEMS */}
                    <div className="cart-items-section">
                        <div className="cart-promo-banner">
                            *NEW SHIPPING & RETURNS UPDATES. SEE CUSTOMER SERVICE PAGE FOR DETAILS.
                        </div>

                        {cartItems.map((item) => (
                            <div className="cart-item-card" key={item.id}>
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.title} />
                                    <button className="item-wishlist-icon">
                                        <FiHeart />
                                    </button>
                                </div>

                                <div className="cart-item-details">
                                    <div className="item-header">
                                        <div>
                                            <p className="item-brand">VOGUECART</p>
                                            <h3 className="item-title">{item.title}</h3>
                                            <p className="item-price">₹ {item.price}</p>
                                        </div>
                                    </div>

                                    <div className="item-meta">
                                        <p>Art. no. 1313197001</p>
                                        <p>Color: {item.color || "Default"}</p>
                                        <p>Size: {item.size || "Standard"}</p>
                                        <p className="item-total-price">Total: ₹ {item.totalPrice}</p>
                                    </div>

                                    <div className="item-actions">
                                        <div className="quantity-control">
                                            <button onClick={() => handleDelete(item.id)} className="delete-icon">
                                                <FiTrash2 />
                                            </button>
                                            <div className="qty-btns">
                                                <button onClick={() => handleDecrement(item.id)}><FiMinus /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncrement(item.id)}><FiPlus /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDE: SUMMARY */}
                    <div className="cart-summary-section">
                        <div className="summary-row">
                            <span>DISCOUNTS</span>
                            <button className="add-discount-btn">ADD</button>
                        </div>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Order value</span>
                                <span>₹ {totalAmount}</span>
                            </div>
                            <div className="summary-row">
                                <span>Estimated shipping fee</span>
                                <span>₹ {shippingFee}</span>
                            </div>
                        </div>

                        <div className="summary-total">
                            <span>TOTAL</span>
                            <span>₹ {finalTotal}</span>
                        </div>

                        <button className="checkout-btn">CONTINUE TO CHECKOUT</button>

                        <div className="summary-auth-links">
                            {!isAuthenticated && (
                                <button className="sign-in-btn" onClick={() => navigate("/login")}>SIGN IN</button>
                            )}
                            <p className="klarna-info">
                                or 4 interest-free payments of ₹ {Math.round(finalTotal / 4)} for VOGUECART members with <span>Klarna</span>
                            </p>
                        </div>

                        <div className="summary-footer-info">
                            <p className="learn-more">LEARN MORE</p>
                            <div className="payment-icons">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" />
                            </div>
                            <p className="tax-info">The estimated tax will be confirmed once you added your shipping address in checkout.</p>
                            <p className="policy-info">30-day returns. Read more about our <u>return and refund policy</u>.</p>
                            <p className="support-info">Need help? Please contact <u>Customer Support</u>.</p>
                            <p className="shipping-options">SHIPPING & RETURN OPTIONS</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
