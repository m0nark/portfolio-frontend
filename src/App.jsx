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

function App() {

    const [isVerified, setIsVerified] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [darkMode, setDarkMode] = React.useState(false);

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
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (!isReady || isVerified === null) {
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
                <a href="#about" className="logo"><img src={Logo} alt="Logo" className="Logo-img" /></a>
                <nav className="navbar">
                    <a href="#about" className="active">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills" className="hover:text-blue-400 transition-colors duration-200">
                        Skills
                    </a>
                    <a href="#experience">Experience</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <DayNightToggle
                checked={darkMode}
                onChange={() => {
                    setDarkMode(v => !v);
                    document.documentElement.classList.toggle("dark-mode");
                }}
            />

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
