'use client';

import {
  IconBrandGithub,
  IconBrandGooglePlay,
  IconExternalLink,
  IconPhotoOff,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { Project } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { TechBadge } from './tech-badge';

export function ProjectCard({ project }: { project: Project }) {
  const { locale } = usePortfolio();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="project-card">
      <div className="project-card__cover">
        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt={localize(project.title, locale)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="project-card__fallback" role="img" aria-label="Project image unavailable">
            <IconPhotoOff size={30} />
            <span>{localize(project.title, locale)}</span>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <h3>{localize(project.title, locale)}</h3>
        <p>{localize(project.description, locale)}</p>

        <div className="project-card__bottom">
          <div className="tech-badges">
            {project.technologies.map((technology) => (
              <TechBadge key={technology} name={technology} />
            ))}
          </div>

          <div className="project-links">
            {project.links.live && (
              <a className="project-link project-link--live" href={project.links.live} target="_blank" rel="noreferrer">
                <IconExternalLink size={16} /> Live
              </a>
            )}
            {project.links.github && (
              <a className="project-link" href={project.links.github} target="_blank" rel="noreferrer">
                <IconBrandGithub size={16} /> GitHub
              </a>
            )}
            {project.links.playstore && (
              <a className="project-link project-link--play" href={project.links.playstore} target="_blank" rel="noreferrer">
                <IconBrandGooglePlay size={16} /> Play Store
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
