import React, { useState, useEffect } from "react";
import "./GoToToButton.css";

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`go-to-top-btn${visible ? " visible" : ""}`}
      onClick={handleClick}
      aria-label="Go to top"
    >
      {/* Up arrow SVG icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M12 5L5 12M12 5l7 7" stroke="#01ECFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export default GoToTopButton;
