import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='description'
          content='An online portfolio and blog by M. Khotibul Umam—showcasing projects, skills in Information Systems, and insights in tech, audit, and risk management.'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
