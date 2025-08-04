import '@styles/globals.scss';

import { configure, start, done } from 'nprogress';
import { AnimatePresence } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script'; // ✅ Tambahkan ini
import { Layout } from '@components/layout/layout';
import { AppHead } from '@components/common/app-head';
import type { AppProps } from 'next/app';

configure({ showSpinner: false });

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeError', done);
Router.events.on('routeChangeComplete', done);

const popAudio =
  typeof window !== 'undefined' ? new Audio('/assets/pop.mp3') : null;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter();

  useEffect(() => void popAudio?.play().catch(() => void 0), [pathname]);

  return (
    <>
      <AppHead />
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=G-6M69SYXSE6'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6M69SYXSE6', {
              page_path: window.location.pathname,
            });
          `
        }}
      />

      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <Layout>
          <AnimatePresence mode='wait'>
            <Component {...pageProps} key={pathname} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>

      <Analytics />
      <SpeedInsights />
    </>
  );
}
