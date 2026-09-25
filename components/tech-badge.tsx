import technologiesData from '@/data/technologies.json';
import { getTechnologyIcon } from '@/lib/icon-map';
import type { Technology } from '@/lib/types';

const technologies = technologiesData as Technology[];
const technologyMap = new Map(technologies.map((tech) => [tech.name, tech]));

export function TechBadge({ name }: { name: string }) {
  const tech = technologyMap.get(name);
  if (!tech) return <span className="tech-badge">{name}</span>;

  const Icon = getTechnologyIcon(tech.icon);
  return (
    <span className="tech-badge">
      <Icon size={14} aria-hidden="true" />
      {tech.title}
    </span>
  );
}
