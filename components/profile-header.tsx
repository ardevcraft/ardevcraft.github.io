'use client';

import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconMapPinFilled,
} from '@tabler/icons-react';
import profileData from '@/data/profile.json';
import type { Profile } from '@/lib/types';
import { localize } from '@/lib/types';
import { launchEmojiConfetti } from '@/lib/confetti';
import { usePortfolio } from './portfolio-provider';
import { Settings } from './settings';
import { ProfileLinks } from './profile-links';

const profile = profileData as Profile;

export function ProfileHeader() {
  const { locale } = usePortfolio();

  return (
    <header className="hero" id="me">
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span aria-hidden="true" /> ENGINEER · BUILDER · FOUNDER
        </p>
        <a className="profile-name" href="#me">
          <h1>
            {profile.name}
            <span>.</span>
          </h1>
        </a>
        <p className="profile-role">{localize(profile.role, locale)}</p>
        <p className="hero__summary">
          {locale === "en"
            ? "I turn complex requirements into clear, dependable software—from mobile products to the systems and tools behind them."
            : "জটিল চাহিদাকে সহজ ও নির্ভরযোগ্য সফটওয়্যারে রূপ দিই—মোবাইল পণ্য থেকে শুরু করে তার পেছনের সিস্টেম ও টুল পর্যন্ত।"}
        </p>
        <div className="hero__actions">
          <a className="hero-button hero-button--primary" href="#list-project">
            Explore selected work <IconArrowDownRight size={17} />
          </a>
          <a
            className="hero-button hero-button--quiet"
            href="mailto:arrahman.bd@outlook.com"
          >
            Get in touch <IconArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero__meta">
          <p className="profile-location">
            <IconMapPinFilled size={15} />
            {localize(profile.location, locale)}
          </p>
        </div>
        <div className="hero__meta">
          <ProfileLinks />
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__portrait-frame">
          <div className="hero__portrait-orbit" aria-hidden="true" />
          <button
            className="avatar-button"
            type="button"
            onClick={() => launchEmojiConfetti("🎉")}
            title="Celebrate"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar} alt={profile.name} />
          </button>
        </div>
        <a
          className="founder-note"
          href="https://orkitt.dev/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="founder-note__label">Building at</span>
          <span className="founder-note__brand">
            orkitt<span>.dev</span>
            <IconArrowUpRight size={15} />
          </span>
        </a>
      </div>
    </header>
  );
}
