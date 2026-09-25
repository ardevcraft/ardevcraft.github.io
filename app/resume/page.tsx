import type { Metadata } from 'next';
import { ResumeViewer } from '@/components/resume-viewer';

export const metadata: Metadata = {
  title: 'Resume | AR Rahman',
  description: "AR Rahman's resume",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
