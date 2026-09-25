import type { Metadata, Viewport } from 'next';
import siteData from '@/data/site.json';
import { PortfolioProvider } from '@/components/portfolio-provider';
import './globals.css';

export const metadata: Metadata = {
  title: siteData.title,
  description: siteData.description,
  openGraph: {
    title: siteData.title,
    description: siteData.description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteData.title,
    description: siteData.description,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteData.themeColor,
};

const themeBootstrap = `
(() => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : (dark ? 'dark' : 'light');
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
