import { SpeedInsights } from '@vercel/speed-insights/next';
import { Footer } from './footer';
import { Header } from './header';
import type { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SpeedInsights />
    </>
  );
}
