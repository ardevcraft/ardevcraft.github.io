'use client';

import experiencesData from '@/data/experiences.json';
import uiData from '@/data/ui.json';
import type { Experience } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { SectionTitle } from './section-title';
import { TechBadge } from './tech-badge';

const experiences = experiencesData as Experience[];

export function ExperienceSection() {
  const { locale } = usePortfolio();

  return (
    <section className="section experience-section" id="experience">
      <SectionTitle id="experience">{localize(uiData.experience, locale)}</SectionTitle>
      <div className="timeline">
        {experiences.map((experience) => (
          <div className="timeline-item" key={experience.key}>
            <span className="timeline-dot" aria-hidden="true" />
            <article className="experience-card">
              <div className="experience-card__header">
                <div>
                  <a href={experience.url} target="_blank" rel="noreferrer">
                    <h3>{localize(experience.company, locale)}</h3>
                  </a>
                  <p>{localize(experience.type, locale)}</p>
                </div>
                <div className="experience-card__meta">
                  <span>{localize(experience.duration, locale)}</span>
                  <span>({localize(experience.role, locale)})</span>
                </div>
              </div>

              <ul className="experience-card__list">
                {experience.description[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="experience-card__tech">
                <small>{localize(uiData.technologiesLabel, locale)}</small>
                <div className="tech-badges">
                  {experience.technologies.map((technology) => (
                    <TechBadge key={technology} name={technology} />
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
