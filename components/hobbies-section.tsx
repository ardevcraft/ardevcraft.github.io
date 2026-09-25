'use client';

import hobbiesData from '@/data/hobbies.json';
import uiData from '@/data/ui.json';
import type { Hobby } from '@/lib/types';
import { localize } from '@/lib/types';
import { launchEmojiConfetti } from '@/lib/confetti';
import { usePortfolio } from './portfolio-provider';
import { SectionTitle } from './section-title';

const hobbies = hobbiesData as Hobby[];

export function HobbiesSection() {
  const { locale } = usePortfolio();

  return (
    <section className="section" id="hobbies">
      <SectionTitle id="hobbies">{localize(uiData.hobbies, locale)}</SectionTitle>
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <button className="hobby-card" type="button" key={hobby.title.en} onClick={() => launchEmojiConfetti(hobby.emoji)}>
            <strong>{localize(hobby.title, locale)}</strong>
            <span aria-hidden="true">{hobby.emoji}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
