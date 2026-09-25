'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFile,
  IconInfoCircle,
  IconMail,
  IconPacman,
  IconPhone,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import profileData from '@/data/profile.json';
import settingsData from '@/data/settings.json';
import type { Meme, Profile } from '@/lib/types';
import { Modal } from './modal';

const profile = profileData as Profile;
const memes = settingsData.memes as Meme[];

const socialIcons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  phone: IconPhone,
  email: IconMail,
  resume: IconFile,
};

export function ProfileLinks() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [memeIndex, setMemeIndex] = useState(0);
  const meme = useMemo(() => memes[memeIndex % memes.length], [memeIndex]);

  const openInfo = () => {
    setMemeIndex(Math.floor(Math.random() * memes.length));
    setModalOpen(true);
  };

  return (
    <>
      <div className="social-row" aria-label="Social links and extras">
        {profile.socials.filter((social) => social.type !== 'resume').map((social) => {
          const Icon = socialIcons[social.type];
          const isExternal = social.url.startsWith('http');
          return (
            <a
              key={social.type}
              className="icon-button"
              href={social.url}
              title={social.label}
              aria-label={social.label}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
            >
              <Icon size={17} />
            </a>
          );
        })}
        <a className="icon-button" href={settingsData.pacmanUrl} target="_blank" rel="noreferrer" title="Pacman game" aria-label="Pacman game">
          <IconPacman size={17} />
        </a>
        <button className="icon-button" type="button" onClick={openInfo} title="Info" aria-label="Info">
          <IconInfoCircle size={17} />
        </button>
      </div>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} ariaLabel={meme.title}>
        <div className="meme-modal">
          <h3>{meme.title}</h3>
          <p>{meme.text}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={meme.image} alt={meme.title} />
          <strong>{meme.realityCheck}</strong>
        </div>
      </Modal>
    </>
  );
}
