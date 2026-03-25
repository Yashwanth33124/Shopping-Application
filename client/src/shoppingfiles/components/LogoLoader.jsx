import React from "react";
import "./LogoLoader.css";

const LogoLoader = ({ size = "50px" }) => {
    return (
        <div className="logo-loader-container" style={{ width: size, height: size }}>
            <img src="/logo2.png" alt="Loading..." className="rotating-logo" />
        </div>
    );
};

export default LogoLoader;
