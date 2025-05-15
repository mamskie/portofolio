import type { ReactNode } from 'react';

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

export default function ResumeSection({
  title,
  children
}: ResumeSectionProps): JSX.Element {
  return (
    <section className='space-y-2'>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <div className='ml-4 space-y-2'>{children}</div>
    </section>
  );
}
