import { Footer } from './footer';
import { Header } from './header';
import type { PropsWithChildren } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";

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
