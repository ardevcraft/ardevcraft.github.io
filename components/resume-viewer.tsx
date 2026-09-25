'use client';

import { IconDownload, IconMaximize, IconX } from '@tabler/icons-react';

export function ResumeViewer() {
  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'AR_Rahman_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const closeViewer = () => {
    window.close();
    if (!window.closed) window.history.back();
  };

  const toggleFullscreen = async () => {
    const viewer = document.getElementById('resume-viewer');
    if (!viewer) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await viewer.requestFullscreen();
    }
  };

  return (
    <main className="resume-page">
      <div className="resume-viewer" id="resume-viewer">
        <embed src="/resume.pdf" type="application/pdf" aria-label="AR Rahman's Resume" />
      </div>

      <div className="resume-actions">
        <button type="button" onClick={downloadPdf} aria-label="Download resume" title="Download resume">
          <IconDownload size={21} />
        </button>
        <button type="button" onClick={closeViewer} aria-label="Close resume" title="Close resume">
          <IconX size={21} />
        </button>
        <button type="button" onClick={toggleFullscreen} aria-label="Toggle fullscreen" title="Toggle fullscreen">
          <IconMaximize size={21} />
        </button>
      </div>
    </main>
  );
}
