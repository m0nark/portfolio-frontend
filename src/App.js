import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import image from "./images/myself.png";
import Typed from "typed.js";

function App() {

    
    const [isVerified, setIsVerified] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [fadeOut, setFadeOut] = useState(false); 

    useEffect(() => {
        fetch("https://api.aaditjain.in/api/v1/visitor/log", {
            method: "PUT",
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || `API error: ${res.status}`);
                }
                setIsVerified(true);  
                console.log("API call successful, isVerified set to true");
            })
            .catch((err) => {
                console.error("API Error:", err); 
                setErrorMsg(err.message);  
                setIsVerified(false);  
                console.log("API Error: Setting isVerified to false");
            });
    }, []);

    useEffect(() => {
        if (isVerified) {
            const showDelay = setTimeout(() => {
                setFadeOut(true); 
    
                const fadeDuration = setTimeout(() => {
                    setIsReady(true); 
                }, 1000); 
    
                return () => clearTimeout(fadeDuration);
            }, 1000); 
    
            return () => clearTimeout(showDelay);
        }
    }, [isVerified]);

    const el = useRef(null);

    useEffect(() => {
        if (isVerified === true && isReady && el.current) {
            const typed = new Typed(el.current, {
                strings: ["Software Engineer", "Gamer", "Home chef", "Gardener"],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            });
    
            return () => typed.destroy();
        }
    }, [isVerified, isReady]);  

    const [scrollY, setScrollY] = useState(0);

    const handleScroll2 = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll2);
        return () => window.removeEventListener('scroll', handleScroll2);
    }, []);

    if (!isVerified) {
        return <div>{errorMsg}</div>;
    }

    if (!isReady) {
        return (
            <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
                <div className="loading-text">
                    <div className="spinner" />
                    <span>Loading portfolio...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`app ${fadeOut ? 'fade-in' : ''}`}>
            <header className="header">
                <a href="#" className="logo">Portfolio</a>
                <nav className="navbar">
                    <a href="#about" className="active">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills">Skills</a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header> 
            <div
                className="top-container"
                style={{
                    opacity: Math.max(1 - scrollY / 550, 0),
                    transform: `translateY(-${scrollY / 5}px)`,
                }}
            >
                <section id="about" className="about-section">
                    <div className="about-content">
                        <h2>Hello, I'm</h2>
                        <h1>Aadit Jain</h1>
                        <h2>And I'm a <span ref={el}></span></h2>
                        <div className="download-social">
                            <a href="#" className="btn-download-resume">Download Resume</a>
                            <div className="social-icons">
                                <a href="https://github.com/m0nark" target="_blank" rel="noopener noreferrer"><i className="ri-github-fill"></i></a>
                                <a href="https://www.instagram.com/m0nark.xd/" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-fill"></i></a>
                                <a href="https://www.facebook.com/aaditiscool" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill"></i></a>
                                <a href="https://www.linkedin.com/in/aadit31/" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-fill"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="about-img">
                        <img src={image} alt="Myself" className="profile-photo" />
                    </div>
                </section>
            </div>

            {/* Other sections */}
            <div className="projects-container">
                <section id="projects" className="section projects-section">
                    <div className="section-content">
                        <h2>Projects</h2>
                        <p>This is the projects section.</p>
                    </div>
                </section>
            </div>

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
