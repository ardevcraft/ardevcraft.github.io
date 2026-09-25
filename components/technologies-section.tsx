'use client';

import { useMemo, useState } from 'react';
import technologiesData from '@/data/technologies.json';
import uiData from '@/data/ui.json';
import { getTechnologyIcon } from '@/lib/icon-map';
import type { Technology } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';

const technologies = technologiesData as Technology[];
const filters = ['all', 'mobile', 'frontend', 'backend', 'database', 'devops', 'language'] as const;

export function TechnologiesSection() {
  const { locale } = usePortfolio();
  const [active, setActive] = useState<(typeof filters)[number]>('all');

  const filtered = useMemo(
    () => (active === 'all' ? technologies : technologies.filter((tech) => tech.categories.includes(active))),
    [active],
  );

  return (
    <section className="section technologies-section" id="tech-section">
      <div className="technologies-heading">
        <div>
          <h2>{localize(uiData.technologies, locale)}</h2>
          <p>{localize(uiData.technologySubtitle, locale)}</p>
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Technology filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-button ${active === filter ? 'is-active' : ''}`}
            type="button"
            onClick={() => setActive(filter)}
          >
            {localize(uiData.filters[filter], locale)}
          </button>
        ))}
      </div>

      <div className="technology-grid">
        {filtered.map((tech) => {
          const Icon = getTechnologyIcon(tech.icon);
          return (
            <div className="technology-card" key={tech.name} title={tech.title}>
              <Icon size={34} stroke={1.7} />
              <span>{tech.title}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
