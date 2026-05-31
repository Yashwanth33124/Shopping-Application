import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { wishlistActions } from "../Redux/WishlistSlice";
import { cartActions } from "../Redux/CartSlice";
import { getImgUrl } from "../../utils/imagePath";
import "./Wishlist.css";
import AnimatedWaveFooter from "../components/PremiumFooter";

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (product) => {
        dispatch(wishlistActions.toggleWishlist(product));
    };

    const handleMoveToCart = (product) => {
        dispatch(cartActions.addToCart({ ...product, quantity: 1 }));
        dispatch(wishlistActions.toggleWishlist(product));
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <header className="wishlist-header">
                    <h1>FAVOURITES</h1>
                    <p>{wishlistItems.length} {wishlistItems.length === 1 ? "ITEM" : "ITEMS"}</p>
                </header>

                {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <FiHeart className="empty-heart-icon" />
                        <h2>YOUR WISHLIST IS EMPTY</h2>
                        <p>Save items that you like to your wishlist so you can find them again later.</p>
                        <button className="shop-all-btn" onClick={() => navigate("/")}>
                            SHOP ALL
                        </button>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlistItems.map((item) => (
                            <div key={item._id} className="wishlist-item-card">
                                <div className="wishlist-image-wrap" onClick={() => handleProductClick(item)}>
                                    <img src={getImgUrl(item.image)} alt={item.name} />
                                    <button 
                                        className="remove-wishlist-btn"
                                        onClick={(e) => { e.stopPropagation(); handleRemove(item); }}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                                <div className="wishlist-item-info">
                                    <h3 onClick={() => handleProductClick(item)}>{item.name}</h3>
                                    <p className="price">₹ {item.price.toLocaleString()}</p>
                                    <button className="add-cart-btn" onClick={() => handleMoveToCart(item)}>
                                        <FiShoppingBag /> ADD TO BAG
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <AnimatedWaveFooter />
        </div>
    );
};

export default Wishlist;
