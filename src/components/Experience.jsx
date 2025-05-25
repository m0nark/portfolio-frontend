import React, { useEffect, useState, useRef } from 'react';
import './Experience.css';
import { skillsMap } from '../services/SkillsService';

const Experience = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const contentRefs = useRef([]);

    useEffect(() => {
        fetch('https://api.aaditjain.in/api/v1/experience/getAll')
            .then((response) => response.json())
            .then((data) => {
                setExperienceData(data.responseObject);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching experience data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
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

    const grouped = groupByType(experienceData);

    if (loading) {
        return <div>Loading...</div>;
    }

    let cardIdx = 0;

    return (
        <div className="experience-container">
            <div className="experience-header-container">
                <h2 className="experience-header">Experience</h2>
            </div>
            <div className="experience-list">
                {['WORK', 'EDUCATION'].map(type => (
                    grouped[type] && (
                        <div key={type} className="experience-type-section">
                            {grouped[type].map((exp) => {
                                const refIdx = cardIdx++;
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
                                                className="experience-content fade-out"
                                                ref={el => contentRefs.current[refIdx] = el}
                                            >
                                                <h3>{exp.title}</h3>
                                                <p>{exp.institution}{'\u00A0'}-{'\u00A0'}</p>
                                                <p className="location">{exp.location}</p>
                                                <span className="duration">{exp.fromDate} - {exp.toDate}</span>
                                                {exp.grade && <h5>{exp.grade}</h5>}
                                                {exp.description !== null && (
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: exp.description.replace(/\\n/g, '<br />') // Note: DOUBLE BACKSLASH!
                                                        }}
                                                    ></p>
                                                )}
                                                {Array.isArray(exp.techStack) && exp.techStack.length > 0 && (
                                                    <div className="tech-stack">
                                                        {exp.techStack.map((tech) => (
                                                            <a
                                                                key={tech}
                                                                className="tech-item"
                                                                href={`https://www.google.com/search?q=${encodeURIComponent(tech)}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title={`${tech}`}
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
function groupByType(data) {
    return data.reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc;
    }, {});
}

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
