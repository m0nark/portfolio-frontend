import React, { useState, useEffect } from "react";
import "./App.css";
import image from "./images/myself.png";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Function to handle scroll event
    const handleScroll = () => {
        const header = document.querySelector(".header");
        if (window.scrollY > header.offsetTop) {
            setIsSticky(true); // Make header sticky
        } else {
            setIsSticky(false); // Remove sticky when not scrolled
        }
    };

    // Use useEffect to add event listener for scroll
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="app">
            <div className="top-container">
                <header className={`header ${isSticky ? "sticky" : ""}`}>
                    <a href="#" className="logo">Portfolio</a>
                    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
                        <a href="#about" className="active">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#skills">Skills</a>
                        <a href="#experience">Experience</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </header>
                <section id="about" className="about-section">
                    <div className="about-content">
                        <h3>Hello, I'm</h3>
                        <h1>Aadit Jain</h1>
                        <h3>And I'm a <span>Gamer</span></h3>
                        <p>This is the about me section where you can introduce yourself!</p>
                        <div className="download-social">
                            <a href="#" className="btn-download-resume">Download Resume</a>
                            <div className="social-icons">
                                <a href="#"><i className="ri-github-fill"></i></a>
                                <a href="#"><i className="ri-instagram-fill"></i></a>
                                <a href="#"><i className="ri-facebook-fill"></i></a>
                                <a href="#"><i className="ri-linkedin-box-fill"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="about-img">
                        <img src={image} alt="Myself" className="profile-photo" />
                    </div>
                </section>
            </div>

            {/* Other sections */}
            <section id="projects" className="section projects-section">
                <div className="section-content">
                    <h2>Projects</h2>
                    <p>This is the projects section.</p>
                </div>
            </section>

            <section id="skills" className="section skills-section">
                <div className="section-content">
                    <h2>Skills</h2>
                    <p>This is the skills section.</p>
                </div>
            </section>

            <section id="experience" className="section experience-section">
                <div className="section-content">
                    <h2>Experience</h2>
                    <p>This is the Experience section.</p>
                </div>
            </section>

            <section id="contact" className="section contact-section">
                <div className="section-content">
                    <h2>Contact</h2>
                    <p>This is the contact section.</p>
                </div>
            </section>
        </div>
    );
}

export default App;
