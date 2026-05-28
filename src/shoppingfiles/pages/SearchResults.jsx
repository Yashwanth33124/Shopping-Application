import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImgUrl } from "../../utils/imagePath";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { wishlistActions } from "../Redux/WishlistSlice";
import LogoLoader from "../components/LogoLoader";
import "./SearchResults.css";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("q") || "";
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("newest");
    const [feedback, setFeedback] = useState(null);

    const feedbackMessages = {
        1: "We're sorry to hear that. We'll work on making our search better!",
        2: "Thanks for your feedback. We're constantly improving!",
        3: "Glad you found something! We'll keep refining our results.",
        4: "Awesome! We're happy to provide the best matches for you.",
        5: "We're thrilled! Your happiness is our top priority! 😍"
    };

    const handleFeedback = (rating) => {
        setFeedback(rating);
    };

    const limit = 20;

    useEffect(() => {
        fetchResults();
    }, [searchTerm, currentPage, sort]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:3001/api/products?search=${searchTerm}&page=${currentPage}&limit=${limit}&sort=${sort}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
                setTotalProducts(data.totalProducts);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            // Add a tiny delay for consistency with ProductDetails loader
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-num ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="pagination-wrap">
                <button 
                  className="page-arrow" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <FiChevronLeft />
                </button>
                {start > 1 && (
                    <>
                        <button className="page-num" onClick={() => handlePageChange(1)}>1</button>
                        {start > 2 && <span className="page-dots">...</span>}
                    </>
                )}
                {pages}
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && <span className="page-dots">...</span>}
                        <button className="page-num" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </>
                )}
                <button 
                  className="page-arrow" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FiChevronRight />
                </button>
            </div>
        );
    };

    return (
        <div className="search-results-page">
            <div className="search-header">
                <div className="search-meta">
                    <div className="search-label">SEARCH RESULT</div>
                    <h1>{searchTerm.toUpperCase()}</h1>
                </div>

                <div className="filter-bar">
                    <div className="filter-left">
                        <div className="sort-dropdown">
                            <span>SORT BY</span>
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="newest">NEWEST</option>
                                <option value="price_asc">PRICE: LOW TO HIGH</option>
                                <option value="price_desc">PRICE: HIGH TO LOW</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-right">
                        <button className="filter-btn">
                            FILTER <FiFilter />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="search-loading">
                    <LogoLoader size="120px" />
                </div>
            ) : (
                <>
                    <div className="search-results-grid">
                        <AnimatePresence mode="wait">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <motion.div 
                                        key={product._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="search-product-card"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        <div className="product-image-wrap">
                                            <img src={getImgUrl(product.image)} alt={product.name} />
                                            <button 
                                                className={`wishlist-heart-btn ${wishlistItems.some(i => i._id === product._id) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(wishlistActions.toggleWishlist(product));
                                                }}
                                            >
                                                <FiHeart />
                                            </button>
                                            {product.role === "prime" && (
                                                <div className="prime-badge-card">PRIME MEMBER</div>
                                            )}
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-desc-short">
                                                {product.description || "Premium quality product from our collection."}
                                            </p>
                                            <p className="product-price">₹ {product.price.toLocaleString()}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="no-results"
                                >
                                    <p>No products found for "{searchTerm}"</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {totalPages > 1 && (
                        <div className="search-bottom-nav">
                            <button 
                                className="load-more-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                LOAD NEXT PAGE
                            </button>
                            {renderPagination()}
                        </div>
                    )}
                </>
            )}
            
            <div className="feedback-section">
                {!feedback ? (
                    <>
                        <h3>HOW HAPPY ARE YOU WITH YOUR SEARCH RESULTS?</h3>
                        <div className="emoji-row">
                            <span className="emoji-btn" onClick={() => handleFeedback(1)}>😞</span>
                            <span className="emoji-btn" onClick={() => handleFeedback(2)}>😐</span>
                            <span className="emoji-btn" onClick={() => handleFeedback(3)}>🙂</span>
                            <span className="emoji-btn" onClick={() => handleFeedback(4)}>😊</span>
                            <span className="emoji-btn" onClick={() => handleFeedback(5)}>😍</span>
                        </div>
                    </>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="feedback-thanks"
                    >
                        <p>{feedbackMessages[feedback]}</p>
                        <button className="reset-feedback" onClick={() => setFeedback(null)}>Change Feedback</button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
