import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { getImgUrl } from "../../utils/imagePath";
import AnimatedWaveFooter from "../components/PremiumFooter";
import Toast from "../components/Toast";
import CartNotification from "../components/CartNotification";
import LogoLoader from "../components/LogoLoader";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { wishlistActions } from "../Redux/WishlistSlice";

const fallbackProduct = {
    id: "fallback",
    title: "OVERSIZED POPLIN SHIRT",
    price: 3999,
    color: "Blue/striped",
    image: "/images6/woman11.avif",
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
    description: "Oversized shirt in airy, striped poplin. Collar, buttons down the front, and a chest pocket. Long sleeves with wide, buttoned cuffs.",
    materials: "100% Cotton",
    delivery: "Standard delivery: 3-5 business days. Free returns."
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState("");
    const [openSection, setOpenSection] = useState("desc");
    const [notification, setNotification] = useState({ show: false, text: "", type: "success" });
    const [cartNotif, setCartNotif] = useState({ show: false, product: null });
    const [quantity, setQuantity] = useState(1);
    const [imgLoaded, setImgLoaded] = useState(false);

    const wishlistItems = useSelector((state) => state.wishlist.items);
    
    // Get product from state or use fallback
    const product = location.state?.product || fallbackProduct;
    const isInWishlist = wishlistItems.some(item => item._id === product._id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        setImgLoaded(false); // Reset on product change
    }, [id]);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? "" : section);
    };

    const triggerToast = (text, type = "success") => {
        setNotification({ show: true, text, type });
        setTimeout(() => setNotification({ show: false, text: "", type: "success" }), 2500);
    };

    const handleAddToCart = () => {
        const cat = product.category?.toLowerCase();
        const isClothing = cat !== "beauty" && cat !== "accessories";
        if (isClothing && !selectedSize && !product.sizes?.includes("One Size")) {
            triggerToast("Please select a size", "warning");
            return;
        }

        const itemToAdd = {
            ...product,
            size: selectedSize || (product.sizes ? product.sizes[0] : "Standard"),
            quantity: quantity
        };
        dispatch(cartActions.addToCart(itemToAdd));
        setCartNotif({ show: true, product: itemToAdd });
    };

    const handleWishlistToggle = () => {
        dispatch(wishlistActions.toggleWishlist(product));
        triggerToast(isInWishlist ? "Removed from Favourites" : "Added to Favourites");
    };

    return (
        <div className="product-page-wrapper">
            {notification.show && <Toast text={notification.text} type={notification.type} />}
            <div className="product-details-container">
                {/* LEFT SIDE: IMAGE */}
                <div className="product-image-section">
                    {!imgLoaded && (
                        <div className="loader-overlay">
                            <LogoLoader size="100px" />
                        </div>
                    )}
                    <img
                        src={getImgUrl(product.image || product.src || product.img)}
                        alt={product.name || product.title}
                        className="main-image"
                        onLoad={() => {
                            setTimeout(() => setImgLoaded(true), 400); // Small delay to appreciate the loader
                        }}
                        style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                    />
                    <button className="view-products-badge">VIEW PRODUCTS</button>
                </div>

                {/* RIGHT SIDE: INFO */}
                <div className="product-info-section">
                    <div className="product-header">
                        <div className="title-price">
                            <div className="role-tags">
                                {product.role === "prime" && <span className="prime-tag">PRIME EXCLUSIVE</span>}
                            </div>
                            <h1 className="product-title">{product.name || product.title}</h1>
                            <p className="product-price">₹ {product.price?.toLocaleString()}</p>
                        </div>

                        <button 
                            className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                            onClick={handleWishlistToggle}
                        >
                            <FiHeart />
                        </button>
                    </div>

                    <div className="color-section">
                        <p className="color-label">COLOR: {product.color || "Standard"}</p>
                        <div className="color-thumbnail active">
                            <img src={getImgUrl(product.image)} alt="Color variant" />
                        </div>
                    </div>

                    <div className="size-section">
                        {product.category?.toLowerCase() === "beauty" || product.category?.toLowerCase() === "accessories" ? (
                            <div className="quantity-selector-wrap">
                                <span className="qty-label">QUANTITY</span>
                                <div className="qty-controls">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
                                </div>
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
            
            <CartNotification 
                show={cartNotif.show} 
                product={cartNotif.product} 
                onClose={() => setCartNotif({ ...cartNotif, show: false })} 
            />
            
            <AnimatedWaveFooter />
        </div>
    );
};

export default ProductDetails;
