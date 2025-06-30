import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Logo from "./images/Logo2.png";
import InstagramFeed from "./components/InstagramFeed";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DayNightToggle from "./components/DayNightToggle";
import GoToTopButton from "./components/GoToTopButton";
import LogoDialog from "./components/LogoDialog";

function App() {

    const [isVerified, setIsVerified] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [darkMode, setDarkMode] = React.useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);


    useEffect(() => {
        if (!isReady && isVerified !== false) {
            const timer = setTimeout(() => {
                setShowLoadingMessage(true);
            }, 5070);
            return () => clearTimeout(timer);
        }
    }, [isReady, isVerified]);


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
            })
            .catch((err) => {
                console.error("API Error:", err);
                setErrorMsg(err.message);
                setIsVerified(false);
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
            }, 200);

            return () => clearTimeout(showDelay);
        }
    }, [isVerified]);

    const [scrollY, setScrollY] = useState(0);

    const handleScroll2 = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll2);
        return () => window.removeEventListener('scroll', handleScroll2);
    }, []);

    if (isVerified === false) {
        return (
            <div className="error-screen">
                <p>{errorMsg || "An error occurred while verifying you."}</p>
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnNyczlvejVkbXB2bmNpdzZ3MDRxd3czb2dpNmZ0Mmx2dzIwbTd5eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UHAYP0FxJOmFBuOiC2/giphy.gif" alt="Error 404" className="error-image" />
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (!isReady || isVerified === null) {
        return (
            <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}>
                <div className="loading-text">
                    <div className="spinner" />
                    {showLoadingMessage && (
                        <div className="loading-delay-message">
                            Sometimes it takes time to load the website since this is being hosted on a non-paid server. PLease wait for a minute or so.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (

        <div className={`app ${fadeOut ? 'fade-in' : ''}`}>
            <header className="header">
                <div className="logo" onClick={(e) => e.stopPropagation()}>
                    <LogoDialog logoSrc={Logo} />
                </div>
                <nav className="navbar desktop-navbar">
                    <a href="#about" className="active">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills" className="hover:text-blue-400 transition-colors duration-200">
                        Skills
                    </a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>
            <div className={`header-mobile ${menuOpen ? "hidden" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`burger-icon ${menuOpen ? "hidden" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {!menuOpen && (
                    <div
                        className="mobile-top-logo"
                        onClick={(e) => e.stopPropagation()} // Prevents click from reaching parent
                    >
                        <LogoDialog logoSrc={Logo} />
                    </div>
                )}
            </div>

            <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
                <div className="mobile-nav-header">
                    <a href="#about" className="logo-mobile"><img src={Logo} alt="Logo" className="Logo-img" /></a>
                    <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
                </div>
                <nav className="mobile-navbar">
                    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
                    <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
                    <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                </nav>
                <div className="mobile-dark-toggle">
                    <div style={{ maxWidth: '100%' }}>
                        <DayNightToggle
                            checked={darkMode}
                            onChange={() => {
                                setDarkMode(v => !v);
                                document.documentElement.classList.toggle("dark-mode");
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="desktop-dark-toggle">
                <DayNightToggle
                    checked={darkMode}
                    onChange={() => {
                        setDarkMode(v => !v);
                        document.documentElement.classList.toggle("dark-mode");
                    }}
                />
            </div>


            <section id="about">
                <About scrollY={scrollY} />
            </section>

            <section id="projects">
                <Projects />
            </section>

            <section id="skills" className="skills-section-outer">
                <Skills />
            </section>

            <section id="experience" className="section experience-section">
                <Experience />
            </section>

            <section id="contact" className="section-contact-outer">
                <Contact />
            </section>

            <section id="footer" className="section-footer-outer">
                <Footer />
            </section>

            <GoToTopButton />

        </div>
    );
}


export default App;
