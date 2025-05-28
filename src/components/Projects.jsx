import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { fetchProjects } from '../services/ProjectService';

const Projects = () => {
    const [repos, setRepos] = useState([]);
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef(null);
    const autoScrollIntervalRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);

    useEffect(() => {
        const getRepos = async () => {
            const fetchedRepos = await fetchProjects();
            setRepos(fetchedRepos);
        };

        getRepos();
    }, []);

    // Calculate card width when repos are loaded
    useEffect(() => {
        if (repos.length && carouselRef.current) {
            const calculateCardWidth = () => {
                const firstCard = carouselRef.current.querySelector('.project-card');
                if (firstCard) {
                    const cardStyle = window.getComputedStyle(firstCard);
                    const width = firstCard.offsetWidth + 
                        parseInt(cardStyle.marginLeft) + 
                        parseInt(cardStyle.marginRight);
                    setCardWidth(width);
                }
            };

            // Wait for next tick to ensure DOM is updated
            setTimeout(calculateCardWidth, 100);
            
            // Recalculate on window resize
            window.addEventListener('resize', calculateCardWidth);
            return () => window.removeEventListener('resize', calculateCardWidth);
        }
    }, [repos]);

    // Auto-scroll functionality
    useEffect(() => {
        if (!repos.length || isPaused || !cardWidth) return;

        autoScrollIntervalRef.current = setInterval(() => {
            scrollToNext();
        }, 2000);

        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, [repos, isPaused, cardWidth]);

    const pauseAutoScroll = (duration = 3000) => {
        clearTimeout(pauseTimeoutRef.current);
        clearInterval(autoScrollIntervalRef.current);
        setIsPaused(true);

        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, duration);
    };

    const scrollToNext = () => {
        if (!carouselRef.current || !cardWidth) return;

        const carousel = carouselRef.current;
        const currentScroll = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

        // Check if we're near the end (within one card width)
        if (currentScroll + cardWidth >= maxScroll) {
            // Move the first set of cards to the end
            const cardsToMove = Math.ceil(repos.length / 2);
            const cards = Array.from(carousel.children);
            
            for (let i = 0; i < cardsToMove; i++) {
                if (cards[i]) {
                    carousel.appendChild(cards[i]);
                }
            }
            
            // Adjust scroll position to maintain visual continuity
            carousel.scrollLeft = currentScroll - (cardsToMove * cardWidth);
        }

        // Scroll by one card width
        carousel.scrollBy({
            left: cardWidth,
            behavior: 'smooth',
        });
    };

    const scrollToPrev = () => {
        if (!carouselRef.current || !cardWidth) return;

        const carousel = carouselRef.current;
        const currentScroll = carousel.scrollLeft;

        // Check if we're at the beginning
        if (currentScroll <= cardWidth) {
            // Move the last set of cards to the beginning
            const cardsToMove = Math.ceil(repos.length / 2);
            const cards = Array.from(carousel.children);
            const cardsToMoveArray = cards.slice(-cardsToMove);
            
            cardsToMoveArray.reverse().forEach(card => {
                carousel.insertBefore(card, carousel.firstChild);
            });
            
            // Adjust scroll position to maintain visual continuity
            carousel.scrollLeft = currentScroll + (cardsToMove * cardWidth);
        }

        // Scroll by one card width
        carousel.scrollBy({
            left: -cardWidth,
            behavior: 'smooth',
        });
    };

    const scrollLeft = () => {
        pauseAutoScroll();
        scrollToPrev();
    };

    const scrollRight = () => {
        pauseAutoScroll();
        scrollToNext();
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

    // Handle card interactions
    useEffect(() => {
        const handleCardInteractions = () => {
            const cards = document.querySelectorAll('.project-card');

            cards.forEach(card => {
                card.style.transformStyle = 'preserve-3d';

                const handleMouseMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * 15;
                    const rotateY = ((x - centerX) / centerX) * -15;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
                };

                const handleMouseLeave = () => {
                    card.style.transition = 'transform 0.3s ease';
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                };

                const handleMouseEnter = () => {
                    pauseAutoScroll();
                    card.style.transition = 'transform 0.1s ease';
                };

                // Remove existing listeners to prevent duplicates
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
                card.removeEventListener('mouseenter', handleMouseEnter);

                // Add new listeners
                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
                card.addEventListener('mouseenter', handleMouseEnter);
            });
        };

        // Set up interactions when repos change
        if (repos.length) {
            setTimeout(handleCardInteractions, 100);
        }
    }, [repos]);

    // Duplicate repos for infinite scroll effect
    const duplicatedRepos = repos.length ? [...repos, ...repos] : [];

    return (
        <div className="projects-container" style={{
            opacity,
            transform: `translateY(${50 - scrollY / 10}px)`,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
            <div className="projects-header-container">
                <h2 className="projects-header">Projects</h2>
            </div>
            <div className="carousel-wrapper">
                <div className="carousel" ref={carouselRef}>
                    {duplicatedRepos.map((repo, index) => (
                        <div key={`${repo.id}-${index}`} className="project-card">
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
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <button className="carousel-button" onClick={scrollRight} aria-label="Scroll Right">
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Projects;