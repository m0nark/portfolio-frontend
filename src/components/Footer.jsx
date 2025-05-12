import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <a href='#about' className="footer-logo">M0NARK</a>
        <p className="footer-tagline">Building the future, one line at a time.</p>
      </div>
    
      <div className="footer-social">
        <a href="https://github.com/m0nark" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="ri-github-fill"></i>
        </a>
        <a href="https://www.instagram.com/m0nark.xd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="ri-instagram-fill"></i>
        </a>
        <a href="https://www.linkedin.com/in/aadit31/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="ri-linkedin-box-fill"></i>
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>&copy; {new Date().getFullYear()} M0NARK. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
