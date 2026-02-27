import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        telephone: "",
        newsletter: false,
        privacy: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3001/api/auth/register",
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

            // redirect to login after successful registration
            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="section-title">PERSONAL DETAILS</h2>

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
                            required
                        />
                    </div>

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
                </form>
            </div>
        </div>
    );
};

export default Register;