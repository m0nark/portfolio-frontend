import React, { useEffect, useRef } from "react";
import "./About.css";
import image from "../images/myself.png"; // Adjust path if needed
import Typed from "typed.js";

const About = ({ scrollY }) => {
    const el = useRef(null);

    useEffect(() => {
        if (el.current) {
            const typed = new Typed(el.current, {
                strings: ["Software Engineer", "Gamer", "Home chef", "Gardener", "Perfume Enthusiast"],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            });
            return () => typed.destroy();
        }
    }, []);

    return (
        <div
            className="top-container"
            style={{
                opacity: Math.max(1 - scrollY / 800, 0),
                transform: `translateY(-${scrollY / 5}px)`,
            }}
        >
            <section id="about" className="about-section">
                <div className="about-content">
                    <h2>Hello, I'm</h2>
                    <h1>Aadit Jain</h1>
                    <h2>
                        And I'm a <span ref={el}></span>
                    </h2>
                    <div className="download-social">
                        <a href="#" className="btn-download-resume">
                            Download Resume
                        </a>
                        <div className="social-icons">
                            <a href="https://github.com/m0nark" target="_blank" rel="noopener noreferrer">
                                <i className="ri-github-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/m0nark.xd/" target="_blank" rel="noopener noreferrer">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://www.facebook.com/aaditiscool" target="_blank" rel="noopener noreferrer">
                                <i className="ri-facebook-fill"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/aadit31/" target="_blank" rel="noopener noreferrer">
                                <i className="ri-linkedin-box-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-img">
                    <img src={image} alt="Myself" className="profile-photo" />
                </div>
            </section>
        </div>
    );
};

export default About;
