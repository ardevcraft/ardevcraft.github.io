'use client';

import supportData from '@/data/support.json';
import uiData from '@/data/ui.json';
import type { SupportData } from '@/lib/types';
import { localize } from '@/lib/types';
import { usePortfolio } from './portfolio-provider';
import { SupportPalestine } from './support-palestine';

const support = supportData as SupportData;

export function Footer() {
  const { locale } = usePortfolio();

  return (
    <footer className="footer">
      <div className="footer__credit">
        <span>{localize(uiData.madeBy, locale)}</span>
        <a href="https://github.com/ardevcraft" target="_blank" rel="noreferrer">AR Rahman</a>
        <span>{localize(uiData.with, locale)}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/heart.png" alt="Heart" />
        <SupportPalestine className="footer__support-trigger">
          {localize(support.label, locale)}
        </SupportPalestine>
      </div>
    </footer>
  );
}
