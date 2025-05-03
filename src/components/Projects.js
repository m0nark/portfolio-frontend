import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { fetchProjects } from '../services/ProjectService';

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef(null);

    useEffect(() => {
        const getRepos = async () => {
            const fetchedRepos = await fetchProjects(); // Fetch repos using the service
            setRepos(fetchedRepos);
        };

        getRepos();
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (!repos.length || isPaused) return;

        const interval = setInterval(() => {
            scrollRight(); // Scroll right by the fixed distance every 3 seconds
        }, 3000);

        return () => clearInterval(interval);
    }, [repos, isPaused]);


    const scrollLeft = () => {
        if (!carouselRef.current) return;
        const scrollDistance = 100; // Fixed scroll distance

        // Clear timeout for pausing auto-scroll
        clearTimeout(pauseTimeoutRef.current);
        setIsPaused(true); // Pause auto-scroll

        // Resume auto-scroll after 3 seconds
        pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);

        // Scroll left by a fixed distance
        carouselRef.current.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        if (!carouselRef.current) return;
        const scrollDistance = 100; // Fixed scroll distance

        // Clear timeout for pausing auto-scroll
        clearTimeout(pauseTimeoutRef.current);
        setIsPaused(true); // Pause auto-scroll

        // Resume auto-scroll after 3 seconds
        pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);

        // Scroll right by a fixed distance
        carouselRef.current.scrollBy({
            left: scrollDistance,
            behavior: 'smooth',
        });

        const isAtEnd = carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth;
        if (isAtEnd) {
            // If we are at the end, scroll back to the start
            setTimeout(() => {
                carouselRef.current.scrollLeft = 0;
            }, 300); // Delay slightly to allow the smooth scroll effect
        }
    };

    const [scrollY, setScrollY] = useState(0);

    const handleScroll2 = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll2);
        return () => window.removeEventListener('scroll', handleScroll2);
    }, []);

    const fadeInStart = 300;
    const fadeInEnd = 500; // fully visible at 600
    const fadeOutStart = 900; // pause between 600–900
    const fadeOutEnd = 1450;

    let opacity = 1;

    if (scrollY < fadeInStart) {
        opacity = 0;
    } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        opacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrollY >= fadeInEnd && scrollY < fadeOutStart) {
        opacity = 1; // hold
    } else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
        opacity = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    } else {
        opacity = 0;
    }

    return (
        <div className="projects-container" style={{
            opacity,
            transform: `translateY(${50 - scrollY / 10}px)`,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>
            <div className="carousel-wrapper">
                <div className="carousel" ref={carouselRef}>
                    {repos.map((repo) => (
                        <div key={repo.id} className="project-card">
                        <h3>{repo.name}</h3>
                      
                        <div className="project-image-area">
                                <img src={repo.imageUrl} alt={`${repo.name} screenshot`} />
                            </div>
                      
                        <div className="project-footer">
                          <p>{repo.description || 'No description available'}</p>
                          <a
                            href={repo.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-view-repo"
                          >
                            View Repo
                          </a>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="carousel-controls">
                    <button className="carousel-button" onClick={scrollLeft} aria-label="Scroll Left">
                        &lt;
                    </button>
                    <button className="carousel-button" onClick={scrollRight} aria-label="Scroll Right">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Projects;
