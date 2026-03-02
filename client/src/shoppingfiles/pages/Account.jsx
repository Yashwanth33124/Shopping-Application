import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../Redux/AuthSlice";
import { clearOrders } from "../Redux/OrderSlice";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiTruck, FiCheck, FiMapPin } from "react-icons/fi";
import "./Account.css";

const Account = () => {
    const { user, isPrime } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orders);
    const [activeTab, setActiveTab] = useState("ACCOUNT & REWARDS");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ username: "", telephone: "", dob: "" });
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [addressForm, setAddressForm] = useState({ fullAddress: "", city: "", state: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSaveProfile = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id || user._id, ...editForm })
            });
            const data = await response.json();
            if (data.success) {
                dispatch(updateUser(data.user));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleAddAddress = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/add-address", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id || user._id, ...addressForm })
            });
            const data = await response.json();
            if (data.success) {
                dispatch(updateUser(data.user));
                setIsAddingAddress(false);
                setAddressForm({ fullAddress: "", city: "", state: "" });
            }
        } catch (error) {
            console.error("Address add failed", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Fetch if username/telephone missing
            if (user && (!user.username || !user.telephone)) {
                try {
                    // Try fetch by ID first if available
                    const url = user.id || user._id
                        ? `http://localhost:3001/api/auth/profile/${user.id || user._id}`
                        : `http://localhost:3001/api/auth/me`;

                    const response = await fetch(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    if (data.success) {
                        dispatch(updateUser(data.user));
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserData();
    }, [user, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearOrders());
        navigate("/");
    };

    const handleTrackOrder = (order) => {
        setSelectedOrder(order);
    };

    const renderTrackingView = (order) => {
        return (
            <div className="tracking-container">
                <div className="back-btn-container">
                    <button className="back-to-orders-btn" onClick={() => setSelectedOrder(null)}>
                        <FiArrowLeft /> BACK TO ORDERS
                    </button>
                </div>

                <div className="tracking-header">
                    <h2 className="section-subtitle">TRACK YOUR ORDER</h2>
                    <p className="tracking-id">Order ID: {order.id} | Tracking ID: {order.trackingId}</p>
                </div>

                <div className="tracking-layout">
                    <div className="tracking-timeline">
                        {order.timeline.map((step, index) => (
                            <div key={index} className={`timeline-item ${step.completed ? 'completed' : ''} ${order.status === step.status ? 'active' : ''}`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h3>{step.status}</h3>
                                    {step.completed ? (
                                        <p>{step.date} {step.time}</p>
                                    ) : (
                                        <p>Pending</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="order-tracking-summary-sidebar">
                        <h2>ORDER SUMMARY</h2>
                        <div className="order-items-mini">
                            {order.items.map((item, idx) => (
                                <div className="mini-item-row" key={idx}>
                                    <img src={item.image} alt={item.title} className="mini-img" />
                                    <div className="mini-info">
                                        <h4>{item.title}</h4>
                                        <p>Qty: {item.quantity || 1} | ₹ {item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="tracking-totals">
                            <div className="tracking-total-row">
                                <span>TOTAL PAID</span>
                                <span>₹ {order.total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                        <div className="delivery-address-mini" style={{ marginTop: '20px', fontSize: '12px' }}>
                            <p style={{ fontWeight: 700, marginBottom: '5px' }}><FiMapPin /> DELIVERY ADDRESS</p>
                            <p>{order.address.fullAddress}</p>
                            <p>{order.address.city}, {order.address.state}</p>
                        </div>
                    </aside>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (selectedOrder) {
            return renderTrackingView(selectedOrder);
        }

        switch (activeTab) {
            case "ORDERS":
                return (
                    <div className="orders-section">
                        <h2 className="section-subtitle">ORDER HISTORY</h2>
                        {orders.length === 0 ? (
                            <div className="empty-orders">
                                <FiPackage size={40} style={{ marginBottom: '15px', color: '#ccc' }} />
                                <p>You haven't placed any orders yet.</p>
                                <button className="shop-now-btn" onClick={() => navigate("/")}>SHOP NOW</button>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {orders.map((order) => (
                                    <div className="order-item-card" key={order.id} onClick={() => handleTrackOrder(order)}>
                                        <div className="order-header">
                                            <span className="order-date">{order.date}</span>
                                            <span className="order-status">{order.status.toUpperCase()}</span>
                                        </div>
                                        <div className="order-body">
                                            <div className="order-img-preview-group">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <img key={i} src={item.image} alt="product" className="order-img-preview" />
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="order-img-mock" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="order-info">
                                                <p className="order-id">Order {order.id}</p>
                                                <p className="order-total">Total: ₹ {order.total.toLocaleString('en-IN')}</p>
                                                <p className="order-track-link" style={{ fontSize: '11px', fontWeight: 700, marginTop: '10px', textDecoration: 'underline' }}>
                                                    <FiTruck style={{ verticalAlign: 'middle', marginRight: '5px' }} /> TRACK ORDER
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case "SETTINGS":
                return (
                    <div className="settings-section">
                        <div className="settings-grid-view">
                            <div className="settings-group">
                                {isEditing ? (
                                    <div className="edit-details-form">
                                        <input type="text" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} placeholder="Username" className="edit-input" />
                                        <input type="text" value={editForm.telephone} onChange={(e) => setEditForm({ ...editForm, telephone: e.target.value })} placeholder="Telephone" className="edit-input" />
                                        <input type="text" value={editForm.dob} onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })} placeholder="DOB (DD/MM/YYYY)" className="edit-input" />
                                        <div className="edit-btns">
                                            <button className="settings-action-link" onClick={handleSaveProfile}>SAVE CHANGES</button>
                                            <button className="settings-action-link" onClick={() => setIsEditing(false)}>CANCEL</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="settings-data-text">{user?.email}</p>
                                        <p className="settings-data-text">{user?.telephone}</p>
                                        <p className="settings-data-text">{user?.username}</p>
                                        {user?.dob && <p className="settings-data-text">{user.dob}</p>}
                                        <button className="settings-action-link" onClick={() => { setIsEditing(true); setEditForm({ username: user.username, telephone: user.telephone, dob: user.dob || "" }); }}>EDIT MY DETAILS</button>
                                    </>
                                )}
                            </div>

                            <div className="settings-divider"></div>

                            <div className="settings-group">
                                {isAddingAddress ? (
                                    <div className="edit-details-form">
                                        <input type="text" value={addressForm.fullAddress} onChange={(e) => setAddressForm({ ...addressForm, fullAddress: e.target.value })} placeholder="Full Address" className="edit-input" />
                                        <input type="text" value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} placeholder="City" className="edit-input" />
                                        <input type="text" value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} placeholder="State" className="edit-input" />
                                        <div className="edit-btns">
                                            <button className="settings-action-link uppercase" onClick={handleAddAddress}>SAVE ADDRESS</button>
                                            <button className="settings-action-link uppercase" onClick={() => setIsAddingAddress(false)}>CANCEL</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button className="settings-action-link uppercase" onClick={() => setIsAddingAddress(true)}>ADD NEW ADDRESS</button>
                                        {user?.addresses && user.addresses.length > 0 ? (
                                            <div className="saved-addresses-list">
                                                {user.addresses.map((addr, idx) => (
                                                    <div key={idx} className="saved-address-preview">
                                                        <p>{addr.fullAddress}</p>
                                                        <p>{addr.city}, {addr.state}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="settings-info-text" style={{ marginTop: '20px', color: '#888' }}>
                                                No saved addresses found. Please add a new address.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="settings-divider"></div>

                            <div className="settings-group">
                                <p className="subscription-status-line">
                                    Membership - <strong>{isPrime ? "VOGUE PRIME Member" : "Normal Member"}</strong>
                                </p>
                                <p className="subscription-status-line">
                                    Newsletter Subscription - <strong>{isPrime ? "Subscribed" : "Normal"}</strong>
                                </p>
                                <p className="subscription-status-line">
                                    Direct Mail Marketing - <strong>{isPrime ? "Subscribed" : "Normal"}</strong>
                                </p>
                                <button className="settings-action-link uppercase">EDIT SUBSCRIPTIONS</button>
                            </div>

                            <div className="settings-divider"></div>

                            <div className="settings-group">
                                <button className="settings-action-link uppercase">CHANGE PASSWORD</button>
                            </div>

                            <div className="settings-divider"></div>

                            <div className="settings-group">
                                <h3 className="settings-subheading">GO TO MY PRIVACY PORTAL</h3>
                                <p className="settings-info-text">
                                    On VOGUE Group's privacy portal you can see your subscriptions, accounts, memberships and/or guest profiles connected to your email address across our brands and countries. Here you can edit subscriptions, request a copy of your data or choose to delete your account.
                                </p>
                            </div>

                            <div className="settings-divider"></div>

                            <div className="settings-group">
                                <button className="settings-action-link uppercase sign-out-action" onClick={handleLogout}>SIGN OUT</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <>
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
                <aside className="account-sidebar">
                    <div className="user-brief">
                        <p>Welcome, {user?.username || "User"}</p>
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
                                className={activeTab === "ACCOUNT & REWARDS" && !selectedOrder ? "active" : ""}
                                onClick={() => { setActiveTab("ACCOUNT & REWARDS"); setSelectedOrder(null); }}
                            >
                                ACCOUNT & REWARDS
                            </li>
                            <li
                                className={activeTab === "ORDERS" || selectedOrder ? "active" : ""}
                                onClick={() => { setActiveTab("ORDERS"); setSelectedOrder(null); }}
                            >
                                ORDERS
                            </li>
                            <li onClick={() => navigate("/prime")}>VOGUEPRIME MEMBERSHIP</li>
                            <li
                                className={activeTab === "SETTINGS" ? "active" : ""}
                                onClick={() => { setActiveTab("SETTINGS"); setSelectedOrder(null); }}
                            >
                                SETTINGS
                            </li>
                        </ul>
                    </nav>

                    <button className="sign-out-link" onClick={handleLogout}>
                        SIGN OUT
                    </button>
                </aside>

                <main className="account-main">
                    <h1 className="account-title">{selectedOrder ? "TRACKING" : activeTab}</h1>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Account;
