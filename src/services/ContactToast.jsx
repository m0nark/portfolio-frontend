import React from "react";
import "./ContactToast.css";

const Toast = ({ message, type = "success", gif, onClose }) => {
  if (!message) return null;
  return (
    <div className={`toast ${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        {gif && (
          <div className="toast-gif">
            <img src={gif} alt="error gif" />
          </div>
        )}
      </div>
      <button className="toast-close" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;