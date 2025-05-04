import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const skills = {
  Frontend: [
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  ],
  Backend: [
    { name: 'Spring', icon: 'devicon-spring-plain colored' },
    { name: 'Java', icon: 'devicon-java-plain colored' },
    { name: 'Python', icon: 'devicon-python-plain colored' },
    { name: 'Redis', icon: 'devicon-redis-plain colored' },
  ],
  Cloud: [
    { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
    { name: 'Google Cloud Console', icon: 'devicon-googlecloud-plain colored' },
  ],
  Tools: [
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'GitHub', icon: 'devicon-github-original colored' },
    { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
    { name: 'IntelliJ', icon: 'devicon-intellij-plain colored' },
    { name: 'Docker', icon: 'devicon-docker-plain colored' },
    { name: 'Jenkins', icon: 'devicon-jenkins-plain colored' },
  ],
  Databases: [
    { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  ],
  Additional: [
    { name: 'JIRA', icon: 'devicon-jira-plain colored' },
    { name: 'FileZilla', icon: 'devicon-filezilla-plain colored' },
    { name: 'Adobe Photoshop', icon: 'devicon-photoshop-plain' },
    { name: 'SonarQube', icon: 'devicon-sonarqube-plain colored' },
  ],
};

const Skills = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const skillRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = entry.target.getAttribute('data-index');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (skillRefs.current) {
        skillRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  let indexCounter = 0;


  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInStart = 1100;
  const fadeInEnd = 1400;
  const fadeOutStart = 2450;
  const fadeOutEnd = 2700;

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

  return (
    <section
      className="skills-section"
      style={{
        opacity,
        transform: `translateY(${50 - scrollY / 10}px)`,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
      id="skills"
    >
      <h2 className="skills-title">
        SKILLS
      </h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <h3 className="skills-category-title">{category}</h3>
            <div className="skills-list">
              {skillList.map((skill) => {
                const index = indexCounter++;
                return (
                  <div
                    key={skill.name}
                    data-index={index}
                    ref={(el) => (skillRefs.current[index] = el)}
                    className={`skill-item ${visibleItems.includes(index.toString()) ? 'animate' : ''}`}
                    title={skill.name}
                  >
                    <i className={`${skill.icon} skill-icon`}></i>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
