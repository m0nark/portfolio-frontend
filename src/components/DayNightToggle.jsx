import React from "react";
import "./DayNightToggle.css";

   const SunIcon = () => (
    <svg className="icon-sun" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill="#FFD600" />
        <g stroke="#FFD600" strokeWidth="2">
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </g>
    </svg>
);

const MoonIcon = () => (
    <svg className="icon-moon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            fill="#A0A4B2"
        />
    </svg>
);

const DayNightToggle = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label="Toggle dark mode"
    />
    <span className="slider">
      <span className="icon sun"><SunIcon /></span>
      <span className="icon moon"><MoonIcon /></span>
    </span>
  </label>
);

export default DayNightToggle;