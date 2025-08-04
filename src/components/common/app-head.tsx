import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin']
});

export function AppHead(): JSX.Element {
  return (
    <>
      <Head>
        <title>M. Khotibul Umam | IT System Enthusiast</title>
        <meta
          name='description'
          content='An online portfolio and blog by M. Khotibul Umam—showcasing projects, skills in Information Systems, and insights in tech, audit, and risk management.'
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
    </>
  );
}
