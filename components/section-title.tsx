import { IconLink } from '@tabler/icons-react';

export function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a className="section-title" href={`#${id}`}>
      <IconLink size={16} className="section-title__icon" aria-hidden="true" />
      <h2>{children}</h2>
    </a>
  );
}
