'use client';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useMemo, useRef, useState } from 'react';
import projectsData from '@/data/projects.json';
import uiData from '@/data/ui.json';
import type { Project } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { ProjectCard } from './project-card';
import { SectionTitle } from './section-title';

const projects = projectsData as Project[];
const filters = ['all', 'mobile', 'web', 'iot', 'package', 'training'] as const;
const pageSize = 6;

export function ProjectsSection() {
  const { locale } = usePortfolio();
  const [active, setActive] = useState<(typeof filters)[number]>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((project) => project.types.includes(active))),
    [active],
  );

  const pageCount = Math.ceil(filtered.length / pageSize);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const selectFilter = (filter: (typeof filters)[number]) => {
    setActive(filter);
    setCurrentPage(1);
  };

  const selectPage = (page: number) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section" id="list-project" ref={sectionRef}>
      <SectionTitle id="list-project">{localize(uiData.projects, locale)}</SectionTitle>

      <div className="filter-row" role="group" aria-label="Project filters">
        {filters.map((filter) => (
          <button
            className={`filter-button ${active === filter ? 'is-active' : ''}`}
            key={filter}
            type="button"
            onClick={() => selectFilter(filter)}
          >
            {localize(uiData.filters[filter], locale)}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="project-pagination" aria-label="Project pages">
          <button className="project-pagination__arrow" type="button" onClick={() => selectPage(currentPage - 1)} disabled={currentPage === 1}>
            <IconChevronLeft size={16} /> <span>{localize(uiData.previous, locale)}</span>
          </button>
          <div className="project-pagination__pages">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button
                className={`project-pagination__page ${currentPage === page ? 'is-active' : ''}`}
                key={page}
                type="button"
                onClick={() => selectPage(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`${localize(uiData.page, locale)} ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
          <span className="project-pagination__count">{localize(uiData.page, locale)} {currentPage} / {pageCount}</span>
          <button className="project-pagination__arrow" type="button" onClick={() => selectPage(currentPage + 1)} disabled={currentPage === pageCount}>
            <span>{localize(uiData.next, locale)}</span> <IconChevronRight size={16} />
          </button>
        </nav>
      )}
    </section>
  );
}
