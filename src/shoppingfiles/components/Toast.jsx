import "./Toast.css";

const Toast = ({ text }) => {
  return (
    <div className="toast">
      {text}
    </div>
  );
};

export default Toast;
