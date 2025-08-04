import { motion } from 'framer-motion';
import {
  SiFirebase,
  SiLaravel,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiMysql,
  SiPython,
  SiGit,
  SiPostman,
  SiJavascript,
  SiPhp,
  SiNodedotjs
} from 'react-icons/si';
import { useState } from 'react';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { CustomLink } from '@components/link/custom-link';
import type { IconType } from 'react-icons';

type TabKey = 'education' | 'experience' | 'Project Experience' | 'training';

const tabs: { label: string; value: TabKey }[] = [
  { label: 'Education', value: 'education' },
  { label: 'Work Experience', value: 'experience' },
  { label: 'Project Experience', value: 'Project Experience' },
  { label: 'Trainings & Certifications', value: 'training' }
];
export default function About(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>('education');
  return (
    <main className='overflow-x-hidden layout min-h-screen'>
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
          <Accent>Favorite Tech Stack</Accent>
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

      <section className='mt-16'>
        <motion.h2
          className='text-xl font-bold md:text-3xl mb-6'
          {...setTransition({ delayIn: 0.5 })}
        >
          <Accent>More About Me</Accent>
        </motion.h2>

        <div className='flex flex-col items-start gap-6'>
          <div className='flex flex-wrap gap-2'>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTab === tab.value
                    ? 'border-accent-main bg-accent-main/10 text-accent-main'
                    : 'border-border bg-transparent text-foreground hover:bg-accent-main/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className='w-full'>
            {activeTab === 'education' && (
              <div>
                {activeTab === 'education' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='space-y-4'
                  >
                    <div>
                      <h3 className='text-lg font-semibold'>
                        <CustomLink href='https://www.uinsa.ac.id/'>
                          {' '}
                          UIN Sunan Ampel Surabaya
                        </CustomLink>
                      </h3>
                      <p className='text-sm text-muted'>
                        Aug 2020 – Jan 2024 · Bachelor of Information System
                        (GPA 3.59/4.00)
                      </p>
                      <ul className='list-disc pl-5 mt-1 text-base'>
                        <li>
                          Completed Thesis: Malware Forensic Analysis on
                          WhatsApp (Android) using D4I Framework
                        </li>
                        <li>
                          Focused on IT Management and Information Systems
                        </li>
                        <li>Graduated in 7 semesters with CumLaude honors</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>
                        <CustomLink href='https://www.man1blitar.sch.id/'>
                          {' '}
                          MAN 1 Blitar
                        </CustomLink>
                      </h3>
                      <p className='text-sm text-muted'>
                        Aug 2016 – Mar 2019 · Blitar, East Java
                      </p>
                      <ul className='list-disc pl-5 mt-1 text-base'>
                        <li>
                          Graduated with a focus on Science and Mathematics
                        </li>
                        <li>
                          Completed PRODISTIK – Graphic Design (Collaboration
                          with ITS Surabaya)
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            {activeTab === 'experience' && (
              <div>
                {activeTab === 'experience' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='space-y-4'
                  >
                    <div>
                      <h3 className='text-lg font-semibold'>
                        <CustomLink href='https://www.pelindo.co.id/'>
                          {' '}
                          PT Pelabuhan Indonesia (Persero)
                        </CustomLink>
                      </h3>
                      <p className='text-sm text-muted'>
                        Jul 2024 – Jun 2025 · Surabaya, Indonesia
                      </p>
                      <ul className='list-disc pl-5 mt-1 text-base'>
                        <li>
                          Contributed to the design and support of internal
                          audit information systems.
                        </li>
                        <li>
                          Managed audit documentation for ISO 9001, 14001, ISPS
                          Code, and SMK3 compliance.
                        </li>
                        <li>
                          Performed hardware setup and troubleshooting to
                          support digital audits.
                        </li>
                        <li>
                          Developed BCM (Business Continuity Management) schemes
                          for cybersecurity threats.
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold'>
                        <CustomLink href='https://www.onyxhouseware.com/'>
                          {' '}
                          PT Presindo Central
                        </CustomLink>
                      </h3>
                      <p className='text-sm text-muted'>
                        Feb 2023 – Mar 2023 · Tangerang, Banten
                      </p>
                      <ul className='list-disc pl-5 mt-1 text-base'>
                        <li>
                          Built archive management system using Laravel +
                          Bootstrap.
                        </li>
                        <li>
                          Integrated REST APIs and assisted with database and
                          backup operations.
                        </li>
                        <li>
                          Provided user training and system testing support.
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            {activeTab === 'Project Experience' && (
              <div>
                {activeTab === 'Project Experience' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='space-y-4'
                  >
                    <ul className='list-disc pl-5'>
                      <li>
                        Web-based Archive Management System –{' '}
                        <CustomLink href='https://laravel.com'>
                          {' '}
                          (Laravel)
                        </CustomLink>
                      </li>
                      <p>
                        Developed during internship at PT Presindo Central,
                        integrating REST APIs and Bootstrap for a user-friendly
                        interface.
                      </p>
                      <li>
                        Water Quality Change Dashboard Project –{' '}
                        <CustomLink href='https://app.powerbi.com/'>
                          {' '}
                          (PowerBI)
                        </CustomLink>
                      </li>
                      <p>
                        Created a dashboard to visualize water quality changes
                        in Banjarmasin, utilizing Power BI for data analysis and
                        reporting.
                      </p>
                      <li>
                        Car Paint Shop Management System –{' '}
                        <CustomLink href='https://laravel.com'>
                          {' '}
                          (Laravel)
                        </CustomLink>
                      </li>
                      <p>
                        Developed a management system for a car paint shop,
                        focusing on inventory and customer management.
                      </p>
                    </ul>
                  </motion.div>
                )}
              </div>
            )}
            {activeTab === 'training' && (
              <div>
                {activeTab === 'training' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='space-y-4'
                  >
                    <ul className='list-disc pl-5'>
                      <li>
                        Understanding Internal Audit Concepts & Techniques ISO
                        19011 Training –{' '}
                        <CustomLink href='https://www.globalkopelindo.com/'>
                          {' '}
                          Global Kopelindo Synergy{' '}
                        </CustomLink>
                        2025
                      </li>
                      <li>
                        ISO 9001 and ISO 22301 Awareness Training –{' '}
                        <CustomLink href='https://www.globalkopelindo.com/'>
                          {' '}
                          Global Kopelindo Synergy{' '}
                        </CustomLink>
                        2025
                      </li>
                      <li>
                        ISO 50001 Awareness Training and ISO 50006 Workshop –{' '}
                        <CustomLink href='https://www.globalkopelindo.com/'>
                          {' '}
                          Global Kopelindo Synergy{' '}
                        </CustomLink>
                        2024
                      </li>
                      <li>
                        Fundamental Web Programming –{' '}
                        <CustomLink href='https://www.hacktiv8.com/'>
                          {' '}
                          Hactiv8{' '}
                        </CustomLink>
                        2024
                      </li>
                      <li>
                        Certified Data Scientist –{' '}
                        <CustomLink href='https://bnsp.go.id/'>
                          {' '}
                          BNSP{' '}
                        </CustomLink>
                        2023
                      </li>
                      <li>
                        Associate Data Science –{' '}
                        <CustomLink href='https://creativemedia.id/'>
                          {' '}
                          Creative Media{' '}
                        </CustomLink>
                        2023
                      </li>
                      <li>
                        Junior Computer Operator & Scientific Writing –{' '}
                        <CustomLink href='https://uinsa.ac.id/pustipd'>
                          {' '}
                          PUSTIPD UINSA{' '}
                        </CustomLink>
                        2023
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
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
    tip: 'a popular general-purpose scripting language that is especially suited to web development.',
    name: 'PHP',
    href: 'https://www.php.net',
    Icon: SiPhp
  },
  {
    tip: "a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing you to build scalable network applications.",
    name: 'Node.js',
    href: 'https://nodejs.org',
    Icon: SiNodedotjs
  },
  {
    tip: 'an open-source relational database management system based on SQL.',
    name: 'MySQL',
    href: 'https://www.mysql.com',
    Icon: SiMysql
  },
  {
    tip: 'a utility-first CSS framework that helps you build custom designs without ever leaving your JSX.',
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    Icon: SiTailwindcss
  },
  {
    tip: 'a JavaScript library for building user interfaces.',
    name: 'React',
    href: 'https://react.dev',
    Icon: SiReact
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
    tip: 'a programming language that lets you work quickly and integrate systems more effectively.',
    name: 'Python',
    href: 'https://www.python.org',
    Icon: SiPython
  },
  {
    tip: 'a distributed version control system for tracking changes in source code during software development.',
    name: 'Git',
    href: 'https://git-scm.com',
    Icon: SiGit
  },
  {
    tip: 'a collaboration platform for API development, allowing you to design, test, and document APIs.',
    name: 'Postman',
    href: 'https://www.postman.com',
    Icon: SiPostman
  },
  {
    tip: 'a high-level, interpreted programming language known for its ease of use and versatility.',
    name: 'JavaScript',
    href: 'https://www.javascript.com',
    Icon: SiJavascript
  }
];
