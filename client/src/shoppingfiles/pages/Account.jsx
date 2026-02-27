import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
    const { user, isPrime } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = React.useState("ACCOUNT & REWARDS");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "ORDERS":
                return (
                    <div className="orders-section">
                        <h2 className="section-subtitle">ORDER HISTORY</h2>
                        <div className="orders-list">
                            {[1, 2].map((order) => (
                                <div className="order-item-card" key={order}>
                                    <div className="order-header">
                                        <span className="order-date">FEBRUARY 20, 2026</span>
                                        <span className="order-status">DELIVERED</span>
                                    </div>
                                    <div className="order-body">
                                        <div className="order-img-mock"></div>
                                        <div className="order-info">
                                            <p className="order-id">Order #VC-209384{order}</p>
                                            <p className="order-total">Total: ₹ 3,499</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "SETTINGS":
                return (
                    <div className="settings-section">
                        <h2 className="section-subtitle">ACCOUNT SETTINGS</h2>
                        <div className="settings-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" defaultValue={user?.name || "User"} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" defaultValue={user?.email || "user@example.com"} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" />
                            </div>
                            <button className="save-settings-btn">SAVE CHANGES</button>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
                        {/* PRIME SUBSCRIPTION BANNER */}
                        <div className="prime-status-banner">
                            <div className="prime-banner-content">
                                <span className="prime-badge">VOGUE PRIME</span>
                                {isPrime ? (
                                    <>
                                        <h2>You're a Prime Member!</h2>
                                        <p>Enjoying your exclusive benefits and free shipping.</p>
                                    </>
                                ) : (
                                    <>
                                        <h2>Join VOGUE Prime</h2>
                                        <p>Get free shipping, exclusive deals, and early access to sales.</p>
                                    </>
                                )}
                            </div>
                            {isPrime ? (
                                <div className="prime-active-pill">
                                    <span className="dot"></span> PRIME EXCLUSIVE ACCESS
                                </div>
                            ) : (
                                <button className="prime-cta-btn" onClick={() => navigate("/prime")}>
                                    GET PRIME
                                </button>
                            )}
                        </div>

                        <div className="rewards-grid">
                            <div className="reward-card promo">
                                <div className="promo-banner black">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="spotify-logo" />
                                    <h3>Spotify Premium</h3>
                                </div>
                                <div className="reward-info">
                                    <p className="reward-desc">UP TO A 3-MONTH FREE TRIAL | SPOTIFY PREMIUM</p>
                                    <p className="reward-expiry">VALID UNTIL: 2026-10-03</p>
                                </div>
                            </div>

                            <div className="reward-card benefit">
                                <div className="benefit-img">
                                    <img src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop" alt="Member Benefit" />
                                </div>
                                <div className="reward-info">
                                    <p className="reward-desc">MEMBER BENEFIT</p>
                                    <p className="reward-expiry">VALID UNTIL: 2026-08-24</p>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="account-page-container">
            <div className="account-layout">
                {/* SIDEBAR */}
                <aside className="account-sidebar">
                    <div className="user-brief">
                        <p>Welcome, {user?.name || "User"}</p>
                        <p className="points-info">250 Points to Bonus Reward</p>
                        <div className="points-meter">
                            <p>500 Points to Plus Status</p>
                            <p className="points-label">POINTS 0/500</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: "0%" }}></div>
                            </div>
                        </div>
                        <p className="member-id">Member ID: 100914221029397</p>
                    </div>

                    <nav className="account-nav">
                        <ul>
                            <li
                                className={activeTab === "ACCOUNT & REWARDS" ? "active" : ""}
                                onClick={() => setActiveTab("ACCOUNT & REWARDS")}
                            >
                                ACCOUNT & REWARDS
                            </li>
                            <li
                                className={activeTab === "ORDERS" ? "active" : ""}
                                onClick={() => setActiveTab("ORDERS")}
                            >
                                ORDERS
                            </li>
                            <li onClick={() => navigate("/prime")}>VOGUEPRIME MEMBERSHIP</li>
                            <li
                                className={activeTab === "SETTINGS" ? "active" : ""}
                                onClick={() => setActiveTab("SETTINGS")}
                            >
                                SETTINGS
                            </li>
                        </ul>
                    </nav>

                    <button className="sign-out-link" onClick={handleLogout}>
                        SIGN OUT
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="account-main">
                    <h1 className="account-title">{activeTab}</h1>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Account;
