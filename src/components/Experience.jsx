import React, { useEffect, useState, useRef } from 'react';
import './Experience.css';
import { skillsMap } from '../services/SkillsService';

const Experience = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const contentRefs = useRef([]);

    useEffect(() => {
        fetch('https://api.aaditjain.in/api/v1/experience/getAll')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                // Validate API response structure
                if (data?.responseObject && Array.isArray(data.responseObject)) {
                    setExperienceData(data.responseObject);
                } else {
                    setHasError(true);
                }
            })
            .catch((error) => {
                console.error('Error fetching experience data:', error);
                setHasError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!experienceData.length) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) return; // Skip observer setup entirely on mobile

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        entry.target.classList.remove('fade-out');
                    } else {
                        entry.target.classList.remove('fade-in');
                        entry.target.classList.add('fade-out');
                    }
                });
            },
            { threshold: 0.4 }
        );

        contentRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            contentRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [experienceData]);

    const groupByType = (data) => {
        if (!Array.isArray(data)) return {};
        return data.reduce((acc, item) => {
            acc[item.type] = acc[item.type] || [];
            acc[item.type].push(item);
            return acc;
        }, {});
    };

    const toggleDescription = (expId) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [expId]: !prev[expId]
        }));
    };

    const hasDescription = (description) => {
        return description !== null && description !== undefined && description.trim() !== '';
    };

    const grouped = groupByType(experienceData);

    if (loading) {
        return <div className="loading-status">Loading experience data...</div>;
    }

    if (hasError || !experienceData.length) {
        return (
            <div className="experience-container">
                <div className="error-message">
                    Unable to load experience data. Please try again later.
                </div>
            </div>
        );
    }

    let cardIdx = 0;

    return (
        <div className="experience-container">
            <div className="experience-header-container">
                <h2 className="experience-header">Experience</h2>
            </div>
            <div className="experience-list">
                {['WORK', 'EDUCATION'].map(type => (
                    grouped[type]?.length > 0 && (
                        <div key={type} className="experience-type-section">
                            {grouped[type].map((exp) => {
                                const refIdx = cardIdx++;
                                const isExpanded = expandedDescriptions[exp.id];
                                const showDescription = hasDescription(exp.description);
                                
                                return (
                                    <div
                                        key={exp.id}
                                        className={`experience-sticky experience-box-${type.toLowerCase()}`}
                                    >
                                        <div className="timeline-marker">
                                            {exp.icon && <i className={exp.icon}></i>}
                                        </div>
                                        <div className="experience-item">
                                            <div
                                                className={`experience-content ${window.innerWidth > 768 ? 'fade-out' : 'visible'}`}
                                                ref={el => contentRefs.current[refIdx] = el}
                                            >
                                                <h3>{exp.title}</h3>
                                                <span className='exp-institution'>{exp.institution}{'\u00A0'}-{'\u00A0'}</span>
                                                <span className="location">{exp.location}</span>
                                                <span className="duration">{exp.fromDate} - {exp.toDate}</span>
                                                {exp.grade && <h5>{exp.grade}</h5>}
                                                
                                                {/* Description toggle button and content */}
                                                {showDescription && (
                                                    <div className="description-section">
                                                        <button 
                                                            className="description-toggle-btn"
                                                            onClick={() => toggleDescription(exp.id)}
                                                            aria-expanded={isExpanded}
                                                            aria-label={isExpanded ? "Collapse description" : "Expand description"}
                                                        >
                                                            <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line`}></i>
                                                        </button>
                                                        
                                                        {isExpanded && (
                                                            <div className="description-content">
                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: exp.description.replace(/\\n/g, '<br />')
                                                                    }}
                                                                ></p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {/* Tech stack - always displayed if available */}
                                                {Array.isArray(exp.techStack) && exp.techStack.length > 0 && (
                                                    <div className="tech-stack">
                                                        {exp.techStack.map((tech) => (
                                                            <a
                                                                key={tech}
                                                                className="tech-item"
                                                                href={`https://www.google.com/search?q=${encodeURIComponent(tech)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={tech}
                                                            >
                                                                <i className={`${getIconForTech(tech)} tech-icon`}></i>
                                                                <span className="tech-name">{tech}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

function getIconForTech(techName) {
    const normalizedTech = techName.toLowerCase();
    for (const category in skillsMap) {
        const found = skillsMap[category].find(
            skill => skill.name.toLowerCase() === normalizedTech
        );
        if (found) return found.icon;
    }
    return 'devicon-question-plain';
}

export default Experience;