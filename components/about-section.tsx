'use client';

import aboutData from '@/data/about.json';
import type { LocalizedText } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { SectionTitle } from './section-title';

interface AboutData {
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

const about = aboutData as AboutData;

export function AboutSection() {
  const { locale } = usePortfolio();
  return (
    <section className="section" id="about">
      <SectionTitle id="about">{localize(about.title, locale)}</SectionTitle>
      <div className="about-copy">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index}>{localize(paragraph, locale)}</p>
        ))}
      </div>
    </section>
  );
}
