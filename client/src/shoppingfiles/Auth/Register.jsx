import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getApiUrl } from "../../config/api.config.js";
import "./Register.css";
import FlowingMenu from "../components/FlowingMenu";
import HelpModal from "../components/HelpModal";
import Toast from "../components/Toast";

const demoItems = [
  { link: '#', text: 'NEW ARRIVALS' },
  { link: '#', text: 'VOGUE COLLECTIONS' },
  { link: '#', text: 'TRENDING NOW' },
  { link: '#', text: 'PREMIUM QUALITY' },
  { link: '#', text: 'STYLISH DEALS' },
  { link: '#', text: 'URBAN FASHION' },
  { link: '#', text: 'ELEGANT STYLES' }
];

const LARGE_IMAGE = '/images6/woman17.jpg';

const Register = () => {
    const navigate = useNavigate();
    const [showHelp, setShowHelp] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        telephone: "",
        newsletter: false,
        privacy: false,
    });
    const [error, setError] = useState("");
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        special: false,
        number: false,
        uppercase: false
    });
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [notification, setNotification] = useState({ show: false, text: "", type: "success" });

    const triggerToast = (text, type = "success") => {
        setNotification({ show: true, text, type });
        setTimeout(() => setNotification({ show: false, text: "", type: "success" }), 2500);
    };

    const validatePassword = (pass) => {
        setPasswordCriteria({
            length: pass.length >= 8,
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
            number: /\d/.test(pass),
            uppercase: /[A-Z]/.test(pass)
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setError(""); // Clear error on change

        if (name === "password") {
            validatePassword(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!passwordCriteria.length || !passwordCriteria.special || !passwordCriteria.number || !passwordCriteria.uppercase) {
            setError("Password does not meet the requirements.");
            return;
        }

        try {
            const response = await fetch(
                getApiUrl("/auth/register"),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formData.name, // backend expects username
                        email: formData.email,
                        password: formData.password,
                        telephone: formData.telephone,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            console.log("Registration success:", data.message);

            // trigger toast success
            triggerToast("Successfully registered! Redirecting to login...", "success");

            // redirect to login after successful registration
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setError(error.message);
            console.error("Registration error:", error.message);
        }
    };

    return (
        <div className="register-container">
            {notification.show && <Toast text={notification.text} type={notification.type} />}
            <button className="back-arrow" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
            </button>
            <div className={`register-content ${error ? 'shake' : ''}`}>
                <h2 className="section-title">PERSONAL DETAILS</h2>

                {error && (
                    <div className="unique-error-box">
                        <div className="error-icon">!</div>
                        <div className="error-text">{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="register-input-group">
                        <label>E-MAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-input-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            required
                        />
                    </div>
                    {(isPasswordFocused || formData.password) && (
                        <div className="password-requirements">
                            <p className={passwordCriteria.length ? "met" : "unmet"}>
                                {passwordCriteria.length ? "✓" : "○"} At least 8 characters
                            </p>
                            <p className={passwordCriteria.uppercase ? "met" : "unmet"}>
                                {passwordCriteria.uppercase ? "✓" : "○"} At least one capital letter
                            </p>
                            <p className={passwordCriteria.special ? "met" : "unmet"}>
                                {passwordCriteria.special ? "✓" : "○"} Special character (!@#$ etc.)
                            </p>
                            <p className={passwordCriteria.number ? "met" : "unmet"}>
                                {passwordCriteria.number ? "✓" : "○"} At least one number
                            </p>
                        </div>
                    )}

                    <div className="register-input-group">
                        <label>NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="phone-group">
                        <div className="prefix-input">
                            <label>PREFIX</label>
                            <div className="prefix-value">+91</div>
                        </div>

                        <div className="telephone-input">
                            <label>TELEPHONE</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <p className="sms-notice">
                        We will send you an SMS to verify your phone number
                    </p>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleChange}
                        />
                        <label htmlFor="newsletter">
                            I wish to receive Voguecart news on my e-mail
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="privacy"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="privacy">
                            I accept the{" "}
                            <span className="underline">
                                privacy statement
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="create-account-btn">
                        CREATE ACCOUNT
                    </button>

                    <button
                        type="button"
                        className="login-back-btn"
                        onClick={() => navigate("/login")}
                    >
                        ALREADY HAVE AN ACCOUNT? LOG IN
                    </button>

                    <div className="help-footer" onClick={() => setShowHelp(true)}>HELP</div>
                </form>
            </div>

            <div className="register-menu-side">
                <FlowingMenu 
                    items={demoItems}
                    largeImage={LARGE_IMAGE}
                    speed={15}
                    textColor="#000"
                    bgColor="transparent"
                    marqueeBgColor="#000"
                    marqueeTextColor="#fff"
                    borderColor="#000"
                />
            </div>
            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        </div>
    );
};

export default Register;