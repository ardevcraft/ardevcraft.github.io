'use client';

import educationData from '@/data/education.json';
import uiData from '@/data/ui.json';
import type { EducationItem } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { SectionTitle } from './section-title';

const education = educationData as EducationItem[];

export function EducationSection() {
  const { locale } = usePortfolio();

  return (
    <section className="section" id="education">
      <SectionTitle id="education">
        {localize(uiData.education, locale)}
      </SectionTitle>
      <div className="education-list">
        {education.map((item) => (
          <article className="education-item" key={item.institution.en}>
            <div>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  <h3>{localize(item.institution, locale)}</h3>
                </a>
              ) : (
                <h3>{localize(item.program, locale)}</h3>
              )}
              <p> {localize(item.institution, locale)}</p>
            </div>
            <span>{localize(item.duration, locale)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
