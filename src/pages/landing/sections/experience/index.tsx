import { useEffect, useState } from 'react';

// Styles
import './style.css';

// Data
import experienceData from '../../../../data/experience.json';
import { markdownToHTML } from '../../../../utils/converter';

// ------------------

function Experience() {
  const [progressReached, setProgressReached] = useState<boolean>(false);

  useEffect(() => {
    const progressBox = document.querySelector('.experience-progress');

    /**
     * Adding width to progress bars on reaching
     */
    const handleScroll = () => {
      if (progressBox) {
        const { top } = progressBox.getBoundingClientRect();
        if (top <= 750) setProgressReached(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <h2 className="title">{experienceData.title}</h2>
      <div className="section-des">{experienceData.description}</div>
      <p
        className="content-670"
        dangerouslySetInnerHTML={{
          __html: markdownToHTML(experienceData.paragraphe),
        }}></p>

      <ul className="experience-history block-right">
        {experienceData.experienceHistory.map((skill, i: number) => (
          <li key={'skill=item-' + i}>
            <span className="date">{skill.date}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: markdownToHTML(skill.description),
              }}></p>
          </li>
        ))}
      </ul>

      <ul className="experience-progress">
        {experienceData.experienceProgress.map((prog, i) => (
          <li key={'prog' + i}>
            <span className="name">{prog.name}</span>
            <div className="skill">
              <div
                className="skill-fill"
                style={{
                  width: progressReached ? `${prog.percentage}%` : 0,
                }}></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
