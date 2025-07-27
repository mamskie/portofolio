import { motion } from 'framer-motion';
import {
  SiFirebase,
  SiLaravel,
  SiTypescript,
  SiTailwindcss
} from 'react-icons/si';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { CustomLink } from '@components/link/custom-link';
import type { IconType } from 'react-icons';

export default function About(): JSX.Element {
  return (
    <main className='layout min-h-screen'>
      <SEO
        title='About'
        description='M. Khotibul Umam is a Fresh Graduate from Information System'
      />
      <section className='grid gap-2'>
        <motion.h2
          className='text-xl font-bold md:text-3xl'
          {...setTransition()}
        >
          About
        </motion.h2>
        <motion.h1
          className='text-2xl font-bold md:text-4xl'
          {...setTransition({ delayIn: 0.1 })}
        >
          <Accent>M. Khotibul Umam</Accent>
        </motion.h1>
      </section>
      <section className='mt-4'>
        <motion.article
          className='prose dark:prose-invert'
          {...setTransition({ delayIn: 0.2 })}
        >
          <p>
            Hi, I&apos;m M. Khotibul Umam, an Information Systems graduate from
            UIN Sunan Ampel Surabaya with a strong interest in web development,
            system governance, and internal audit. My journey in tech began by
            developing web-based archive management systems using
            <CustomLink href='https://laravel.com'> Laravel</CustomLink> during
            my internship at PT Presindo Central, where I also worked with
            <CustomLink href='https://getbootstrap.com'> Bootstrap </CustomLink>
            and REST API integration.
          </p>
          <p>
            I continued growing professionally at PT Pelabuhan Indonesia
            Regional 3, contributing to internal audits across branches using
            ISO 9001, ISO 14001, ISPS Code, and SMK3 standards. I was also
            involved in risk management, compliance monitoring, and building
            Business Continuity Management (BCM) schemes for cybersecurity
            scenarios. This hands-on experience helped sharpen my skills in data
            analysis, reporting, and enterprise-level systems evaluation.
          </p>
          <p>
            I enjoy working on data-driven projects, like when I created a
            dashboard to visualize water quality changes in Banjarmasin using
            <CustomLink href='https://powerbi.microsoft.com'>
              {' '}
              Power BI
            </CustomLink>
            . I&apos;m always eager to learn, build, and collaborate—this site
            is where I showcase my work, share insights, and reflect on what
            I&apos;ve learned. Feel free to reach out if you&apos;d like to
            connect or collaborate!
          </p>
        </motion.article>
      </section>
      <section className='mt-12 grid gap-4'>
        <motion.h2
          className='text-xl font-bold md:text-3xl'
          {...setTransition({ delayIn: 0.3 })}
        >
          Favorite Tech Stack
        </motion.h2>
        <motion.ul
          className='translate flex gap-4 [&>li:first-child>div]:-translate-x-4
                     [&>li:nth-child(2)>div]:-translate-x-16 [&>li:nth-child(3)>div]:-translate-x-28'
          {...setTransition({ delayIn: 0.4 })}
        >
          {favoriteTechStack.map(({ tip, name, href, Icon }) => (
            <Tooltip
              tooltipClassName='group-hover:!-translate-y-36 w-72 px-3 py-4 !-translate-y-28
                                text-center !whitespace-normal 2xl:!-translate-x-1/2
                                peer-focus-visible:!-translate-y-36'
              tag='li'
              key={name}
              tip={
                <>
                  <CustomLink href={href} tabIndex={-1}>
                    {name}
                  </CustomLink>
                  {', '}
                  {tip}
                </>
              }
            >
              <button className='smooth-tab peer'>
                <Icon className='text-4xl transition-colors hover:text-accent-main' />
              </button>
            </Tooltip>
          ))}
        </motion.ul>
      </section>
    </main>
  );
}

type FavoriteTechStack = {
  tip: string;
  name: string;
  href: string;
  Icon: IconType;
};

const favoriteTechStack: FavoriteTechStack[] = [
  {
    tip: 'a PHP framework for web artisans, providing elegant syntax and tools for building modern web applications.',
    name: 'Laravel',
    href: 'https://laravel.com',
    Icon: SiLaravel
  },
  {
    tip: 'a strongly typed language that builds on JavaScript, giving you better tooling at any scale.',
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org',
    Icon: SiTypescript
  },
  {
    tip: 'an app development platform that helps you build and grow apps and games users love.',
    name: 'Firebase',
    href: 'https://firebase.google.com',
    Icon: SiFirebase
  },
  {
    tip: 'a utility-first CSS framework that helps you build custom designs without ever leaving your JSX.',
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    Icon: SiTailwindcss
  }
];
