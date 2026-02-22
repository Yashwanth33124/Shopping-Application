import "./Toast.css";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiShoppingBag } from "react-icons/fi";

const Toast = ({ text, type = "success" }) => {
  const getIcon = () => {
    switch (type) {
      case "success": return <FiCheckCircle className="toast-icon success" />;
      case "error": return <FiAlertCircle className="toast-icon error" />;
      case "warning": return <FiAlertCircle className="toast-icon warning" />;
      case "info": return <FiInfo className="toast-icon info" />;
      default: return <FiShoppingBag className="toast-icon" />;
    }
  };

  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-text">{text}</span>
      </div>
      <div className="toast-progress"></div>
    </div>
  );
};

export default Toast;
