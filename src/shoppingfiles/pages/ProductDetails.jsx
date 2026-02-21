import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { getImgUrl } from "../../utils/imagePath";

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

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedSize, setSelectedSize] = useState("");
    const [openSection, setOpenSection] = useState("desc");

    // Get product from state or use fallback
    const product = location.state?.product || fallbackProduct;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? "" : section);
    };

    return (
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
                </div>

                <button className="add-to-bag-btn">ADD TO BAG</button>

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
    );
};

export default ProductDetails;
