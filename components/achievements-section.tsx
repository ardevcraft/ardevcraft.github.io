'use client';

import { IconConfetti } from '@tabler/icons-react';
import achievementsData from '@/data/achievements.json';
import uiData from '@/data/ui.json';
import type { Achievement } from '@/lib/types';
import { localize } from '@/lib/types';
import { launchEmojiConfetti } from '@/lib/confetti';
import { usePortfolio } from './portfolio-provider';
import { SectionTitle } from './section-title';

const achievements = achievementsData as Achievement[];

export function AchievementsSection() {
  const { locale } = usePortfolio();

  return (
    <section className="section" id="certifications">
      <div className="section-title-row">
        <SectionTitle id="certifications">{localize(uiData.achievements, locale)}</SectionTitle>
        <button className="icon-button icon-button--ghost" type="button" onClick={() => launchEmojiConfetti('🎊')} title="Celebrate achievements">
          <IconConfetti size={18} />
        </button>
      </div>

      <div className="achievement-list">
        {achievements.map((achievement) => {
          const content = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={achievement.image} alt="" />
            </>
          );

          return (
            <article className="achievement-item" key={achievement.title.en}>
              <div className="achievement-item__copy">
                {achievement.url ? (
                  <a href={achievement.url} target="_blank" rel="noreferrer"><h3>{localize(achievement.title, locale)}</h3></a>
                ) : (
                  <h3>{localize(achievement.title, locale)}</h3>
                )}
                {achievement.details.map((detail) => (
                  <p key={detail.en}>{localize(detail, locale)}</p>
                ))}
              </div>
              <div className="achievement-item__media">
                <span>{localize(achievement.date, locale)}</span>
                {achievement.url ? (
                  <a href={achievement.url} target="_blank" rel="noreferrer">{content}</a>
                ) : content}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
