import React from "react";
import "./LogoLoader.css";
import FastImage from "../../components/FastImage";

const LogoLoader = ({ size = "50px" }) => {
    return (
        <div className="logo-loader-container" style={{ width: size, height: size }}>
            <FastImage
                src={`${import.meta.env.BASE_URL}logo2.png`}
                alt="Loading..."
                className="rotating-logo"
            />
        </div>
    );
};

export default LogoLoader;

