import React, { useState, useEffect } from "react";
import "./App.css";
import image from "./images/myself.png";

function App() {
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
      <section id="about" className="about-section">
        <div className="about-box">
        <header className={`header ${isSticky ? "sticky" : ""}`}>
            <div className="logo">Portfolio</div>
            <nav className="navbar">
              <a href="#about" className="active">About</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>

          <div className="about-content">
            <h2>About Me</h2>
            <p>This is the about me section where you can introduce yourself!</p>
          </div>

          <div className="about-img">
            <img src={image} alt="Myself" className="profile-photo" />
          </div>
        </div>
      </section>

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
