'use client';

import { IconHash } from '@tabler/icons-react';
import { useState, type ReactNode } from 'react';
import supportData from '@/data/support.json';
import type { SupportData } from '@/lib/types';
import { localize } from '@/lib/types';
import { Modal } from './modal';
import { usePortfolio } from './portfolio-provider';

const support = supportData as SupportData;

export function SupportPalestine({ children, className = 'support-link' }: { children?: ReactNode; className?: string }) {
  const { locale } = usePortfolio();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={className}
       
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {children ?? (
          <>
            <IconHash size={15} />
            {localize(support.title, locale)}
          </>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        ariaLabel={localize(support.title, locale)}
      >
        <div className="support-modal">
          <h3>{localize(support.title, locale)}</h3>
          <p>{localize(support.message, locale)}</p>
          <a href={support.url} target="_blank" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="support-modal__image"
              src={support.image}
              alt={localize(support.title, locale)}
            />
          </a>
        </div>
      </Modal>
    </>
  );
}
