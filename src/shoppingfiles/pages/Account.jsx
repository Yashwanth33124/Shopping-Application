import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
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
                            <li className="active">ACCOUNT & REWARDS</li>
                            <li>ORDERS</li>
                            <li>VOGUECART MEMBERSHIP</li>
                            <li>SETTINGS</li>
                        </ul>
                    </nav>

                    <button className="sign-out-link" onClick={handleLogout}>
                        SIGN OUT
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className="account-main">
                    <h1 className="account-title">ACCOUNT & REWARDS</h1>

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
                </main>
            </div>
        </div>
    );
};

export default Account;
