'use client';

import {
  IconFile,
  IconLanguage,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { usePortfolio } from './portfolio-provider';

export function Settings() {
  const { locale, toggleLocale, theme, toggleTheme } = usePortfolio();

  return (
    <div className="settings-row" aria-label="Portfolio settings">
      <button className="icon-button icon-button--ghost" type="button" onClick={toggleLocale} title="Change language" aria-label="Change language">
        <IconLanguage size={17} />
        <span className="settings-row__locale">{locale === 'en' ? 'BN' : 'EN'}</span>
      </button>
      <button className="icon-button icon-button--ghost" type="button" onClick={toggleTheme} title="Toggle dark mode" aria-label="Toggle dark mode">
        {theme === 'dark' ? <IconMoon size={17} /> : <IconSun size={17} />}
      </button>
      <a className="icon-button icon-button--ghost" href="/resume" title="Resume" aria-label="Resume">
        <IconFile size={17} />
      </a>
    </div>
  );
}
