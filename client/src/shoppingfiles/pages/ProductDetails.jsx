import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { getImgUrl } from "../../utils/imagePath";
import AnimatedWaveFooter from "../components/footer";
import Toast from "../components/Toast";
import CartNotification from "../components/CartNotification";

// Mock data as fallback
const fallbackProduct = {
    id: "fallback",
    title: "OVERSIZED POPLIN SHIRT",
    price: 3999,
    color: "Blue/striped",
    image: getImgUrl("/images6/woman11.avif"),
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    description: "Oversized shirt in airy, striped poplin. Collar, buttons down the front, and a chest pocket. Long sleeves with wide, buttoned cuffs.",
    materials: "100% Cotton",
    delivery: "Standard delivery: 3-5 business days. Free returns."
};

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState("");
    const [openSection, setOpenSection] = useState("desc");
    const [notification, setNotification] = useState({ show: false, text: "", type: "success" });
    const [cartNotif, setCartNotif] = useState({ show: false, product: null });

    // Get product from state or use fallback
    const product = location.state?.product || fallbackProduct;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? "" : section);
    };

    const triggerToast = (text, type = "success") => {
        setNotification({ show: true, text, type });
        setTimeout(() => setNotification({ show: false, text: "", type: "success" }), 2500);
    };

    const handleAddToCart = () => {
        // If it's clothing (not beauty/accessories) and no size is selected
        const isClothing = product.category !== "beauty" && product.category !== "accessories";
        if (isClothing && !selectedSize && !product.sizes?.includes("One Size")) {
            triggerToast("Please select a size", "warning");
            return;
        }

        const itemToAdd = {
            ...product,
            size: selectedSize || (product.sizes ? product.sizes[0] : "Standard"),
            quantity: 1
        };
        dispatch(cartActions.addToCart(itemToAdd));
    };

    return (
        <div className="product-page-wrapper">
            {notification.show && <Toast text={notification.text} type={notification.type} />}
            <div className="product-details-container">
                {/* LEFT SIDE: IMAGE */}
                <div className="product-image-section">
                    {product.video ? (
                        <video
                            src={product.video}
                            alt={product.title}
                            className="main-image"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <img src={product.image} alt={product.title} className="main-image" />
                    )}
                    <button className="view-products-badge">VIEW PRODUCTS</button>
                </div>

                {/* RIGHT SIDE: INFO */}
                <div className="product-info-section">
                    <div className="product-header">
                        <div className="title-price">
                            <h1 className="product-title">{product.title}</h1>
                            <p className="product-price">₹ {product.price}</p>
                        </div>
                        <button className="wishlist-btn">
                            <FiHeart />
                        </button>
                    </div>

                    <div className="color-section">
                        <p className="color-label">COLOR: {product.color || "Standard"}</p>
                        <div className="color-thumbnail active">
                            <img src={product.image} alt="Color variant" />
                        </div>
                    </div>

                    <div className="size-section">
                        {product.category === "beauty" || product.category === "accessories" || (product.sizes && (product.sizes.includes("One Size") || product.sizes.includes("Standard"))) ? (
                            <div className="size-label-single">
                                <span>SIZE: </span>
                                <strong>{product.sizes ? product.sizes[0] : "One Size"}</strong>
                            </div>
                        ) : (
                            <>
                                <div className="size-grid">
                                    {(product.sizes || fallbackProduct.sizes).map((size) => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <button className="size-guide">SIZE GUIDE</button>
                            </>
                        )}
                    </div>

                    <button className="add-to-bag-btn" onClick={handleAddToCart}>ADD TO BAG</button>

                    <p className="pickup-info"> Free pickup at: <span className="underline">FIND A STORE</span></p>

                    {/* COLLAPSIBLE SECTIONS */}
                    <div className="collapsible-container">
                        <div className="collapsible-item">
                            <button className="collapsible-trigger" onClick={() => toggleSection("desc")}>
                                DESCRIPTION & FIT
                                {openSection === "desc" ? <FiMinus /> : <FiPlus />}
                            </button>
                            <div className={`collapsible-content ${openSection === "desc" ? "open" : ""}`}>
                                <p>{product.description || fallbackProduct.description}</p>
                            </div>
                        </div>

                        <div className="collapsible-item">
                            <button className="collapsible-trigger" onClick={() => toggleSection("materials")}>
                                MATERIALS
                                {openSection === "materials" ? <FiMinus /> : <FiPlus />}
                            </button>
                            <div className={`collapsible-content ${openSection === "materials" ? "open" : ""}`}>
                                <p>{product.materials || fallbackProduct.materials}</p>
                            </div>
                        </div>

                        <div className="collapsible-item">
                            <button className="collapsible-trigger" onClick={() => toggleSection("delivery")}>
                                DELIVERY AND PAYMENT
                                {openSection === "delivery" ? <FiMinus /> : <FiPlus />}
                            </button>
                            <div className={`collapsible-content ${openSection === "delivery" ? "open" : ""}`}>
                                <p>{product.delivery || fallbackProduct.delivery}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatedWaveFooter />
        </div>
    );
};

export default ProductDetails;
