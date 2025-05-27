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
            const fetchedRepos = await fetchProjects();
            setRepos(fetchedRepos);
        };

        getRepos();
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (!repos.length || isPaused) return;

        const interval = setInterval(() => {
            scrollRight();
        }, 4000);

        return () => clearInterval(interval);
    }, [repos, isPaused]);


    const scrollLeft = () => {
        if (!carouselRef.current) return;
        const scrollDistance = 100;


        clearTimeout(pauseTimeoutRef.current);
        setIsPaused(true);

        pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);

        carouselRef.current.scrollBy({
            left: -scrollDistance,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        if (!carouselRef.current) return;
        const scrollDistance = 100;

        clearTimeout(pauseTimeoutRef.current);
        setIsPaused(true);

        pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);

        carouselRef.current.scrollBy({
            left: scrollDistance,
            behavior: 'smooth',
        });

        const isAtEnd = carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth;
        if (isAtEnd) {
            setTimeout(() => {
                carouselRef.current.scrollLeft = 0;
            }, 300);
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
    const fadeInEnd = 500;
    const fadeOutStart = 900;
    const fadeOutEnd = 1450;

    let opacity = 1;

    if (scrollY < fadeInStart) {
        opacity = 0;
    } else if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
        opacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
    } else if (scrollY >= fadeInEnd && scrollY < fadeOutStart) {
        opacity = 1; 
    } else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
        opacity = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    } else {
        opacity = 0;
    }

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((x - centerX) / centerX) * -15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
        });

        card.addEventListener('mouseleave', () => {
            setIsPaused(false);
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        card.addEventListener('mouseenter', () => {
            setIsPaused(true);
            card.style.transition = 'transform 0.1s ease';
        });
    });

    return (
        <div className="projects-container" style={{
            opacity,
            transform: `translateY(${50 - scrollY / 10}px)`,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}><div className="projects-header-container">
                <h2 className="projects-header">Projects</h2>
            </div>
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
                        <i class="ri-arrow-left-s-line"></i>
                    </button>
                    <button className="carousel-button" onClick={scrollRight} aria-label="Scroll Right">
                        <i class="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Projects;
