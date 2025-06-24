import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';
import { skillsMap } from '../services/SkillsService';

const Skills = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const categoryRefs = useRef([]);

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (visibleCategories.length > 0 && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleCategories, hasAnimated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const category = entry.target.getAttribute('data-category');
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => [...new Set([...prev, category])]);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
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
        {Object.entries(skillsMap).map(([category, skillList], idx) => (
          <div
            key={category}
            data-category={category}
            ref={(el) => (categoryRefs.current[idx] = el)}
          >
            <h3 className="skills-category-title">{category}</h3>
            <div className="skills-list">
              {skillList.map((skill, skillIndex) => (
                <a
                  key={skill.name}
                  className={`skill-item ${visibleCategories.includes(category) ? 'slide-in' : 'hidden'}`}
                  href={`https://www.google.com/search?q=${encodeURIComponent(skill.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Search "${skill.name}" on Google`}
                  style={
                    !hasAnimated && visibleCategories.includes(category)
                      ? { transitionDelay: `${skillIndex * 175}ms` }
                      : {}
                  }
                >
                  <i className={`${skill.icon} skill-icon`}></i>
                  <span className="skill-name">{skill.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
