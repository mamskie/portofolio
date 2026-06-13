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
import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import { setTransition } from '@lib/transition';
import { getPortfolio } from '@lib/portfolio';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';
import { Tooltip } from '@components/ui/tooltip';
import { Button } from '@components/ui/button';
import { CustomLink } from '@components/link/custom-link';
import { PortfolioModal } from '@components/admin/portofolio-modal';
import { authOptions } from './api/auth/[...nextauth]';
import type { AuthOptions } from 'next-auth';
import type { IconType } from 'react-icons';
import type { Portfolio } from '@lib/types/portfolio';
import type { CustomSession } from '@lib/types/api';

type TabKey = 'education' | 'experience' | 'Project Experience' | 'training';

const tabs: { label: string; value: TabKey }[] = [
  { label: 'Education', value: 'education' },
  { label: 'Work Experience', value: 'experience' },
  { label: 'Project Experience', value: 'Project Experience' },
  { label: 'Trainings & Certifications', value: 'training' }
];
// export default function About(): JSX.Element {
type AboutProps = {
  portfolio: Portfolio[];
  session: CustomSession | null;
};

export default function About({ portfolio, session }: AboutProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>('education');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>(portfolio);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

  const activeType = activeTab === 'Project Experience' ? 'project' : activeTab;
  const activeTypeLabel =
    activeType === 'project'
      ? 'Project'
      : activeType === 'training'
        ? 'Training'
        : activeType === 'education'
          ? 'Education'
          : 'Experience';
  const activeItems = portfolioItems.filter((item) => item.type === activeType);

  useEffect(() => {
    async function fetchPortfolioItems(): Promise<void> {
      setIsLoadingPortfolio(true);

      try {
        const response = await fetch('/api/portfolio');

        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.status}`);
        }

        const data = (await response.json()) as Portfolio[];
        setPortfolioItems(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load portfolio data', error);
      } finally {
        setIsLoadingPortfolio(false);
      }
    }

    void fetchPortfolioItems();
  }, []);

  function handleEdit(portfolio: Portfolio): void {
    setSelectedPortfolio(portfolio);
    setShowPortfolioModal(true);
  }

  function handleAdd(): void {
    setSelectedPortfolio(null);
    setShowPortfolioModal(true);
  }

  async function handleDelete(id: string): Promise<void> {
    const confirmed = window.confirm('Delete this experience?');

    if (!confirmed) return;

    const response = await fetch(`/api/portfolio/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    });

    if (!response.ok) {
      const errorBody = await response.text();
      alert(`Failed to delete (${response.status}): ${errorBody}`);
      return;
    }

    window.location.reload();
  }
  return (
    <main className='overflow-x-visible layout min-h-screen'>
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
      <section id='about' className='mt-12 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto'>
          {/* LEFT SIDE: 2/3 TEXT */}
          <motion.article
            className='prose prose-neutral dark:prose-invert md:col-span-2'
            {...setTransition({ delayIn: 0.2 })}
          >
            <p>
              Hi, I&apos;m M. Khotibul Umam, an Information Systems graduate
              with experience in IT Operations, Monitoring & Reporting, IT
              Governance, Internal Audit, and Web Development. I have worked on
              infrastructure monitoring, incident management, dashboard
              reporting, compliance assessments, and business process
              improvement initiatives.
            </p>

            <p>
              I am passionate about Application Support, System Analysis, Data &
              Reporting, GRC, and technology-driven problem solving. I enjoy
              learning new technologies, analyzing complex problems, and
              delivering solutions that improve operational efficiency and
              business performance.
            </p>

            <p>
              This portfolio showcases my projects, experiences, certifications,
              and continuous learning journey. I&apos;m always open to
              connecting with professionals, exploring new opportunities, and
              contributing to impactful technology initiatives.
            </p>
          </motion.article>
          <motion.div
            className='w-full flex justify-center md:justify-end'
            {...setTransition({ delayIn: 0.4 })}
          >
            <div className='relative group w-fit'>
              {/* <Image
                src='/MAM.webp'
                alt='Photo of me'
                width={350}
                height={250}
                className='rounded-2xl shadow-lg object-cover'
              />
              <div className='absolute inset-0 bg-black opacity-100 rounded-2xl group-hover:opacity-0 transition duration-1000 mix-blend-multiply'></div>
              <Image
                src='/logo.webp'
                alt='Logo Overlay'
                width={250}
                height={400}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition duration-1000'
              /> */}
            </div>
          </motion.div>
        </div>
      </section>
      <section id='favorite-tech-stack' className='mt-12 grid gap-4'>
        <motion.h2
          className='text-xl font-bold md:text-3xl'
          {...setTransition({ delayIn: 0.3 })}
        >
          <Accent>Favorite Tech Stack</Accent>
        </motion.h2>
        <motion.ul
          className='grid grid-cols-3 gap-16 sm:grid-cols-6
             place-items-center'
          {...setTransition({ delayIn: 0.4 })}
        >
          {favoriteTechStack.map(({ tip, name, href, Icon }) => (
            <Tooltip
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
              tooltipClassName='group-hover:!-translate-y-36 w-72 px-3 py-4 !-translate-y-28
                        text-center !whitespace-normal 2xl:!-translate-x-1/2
                        peer-focus-visible:!-translate-y-36'
            >
              <button className='smooth-tab peer'>
                <Icon className='text-4xl transition-colors hover:text-accent-main' />
              </button>
            </Tooltip>
          ))}
        </motion.ul>
      </section>

      <section id='more' className='mt-16'>
        <motion.h2
          className='text-xl font-bold md:text-3xl mb-6'
          {...setTransition({ delayIn: 0.5 })}
        >
          <Accent>More About Me</Accent>
        </motion.h2>

        <div className='w-full'>
          <div className='flex flex-wrap gap-2 mb-6'>
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full py-2 px-4 border transition text-sm font-medium ${
                  activeTab === tab.value
                    ? 'bg-accent-main/10 text-accent-main border-accent-main'
                    : 'border-transparent text-muted-foreground hover:bg-muted/10 hover:border-muted-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className='w-full'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-4'
            >
              {session?.user?.admin && (
                <div className='mb-4 flex justify-end'>
                  <Button onClick={handleAdd} className='custom-button'>
                    + Add {activeTypeLabel}
                  </Button>
                </div>
              )}

              {isLoadingPortfolio ? (
                <p>Loading portfolio data...</p>
              ) : activeItems.length === 0 ? (
                <p>No {activeTypeLabel.toLowerCase()} data found.</p>
              ) : (
                activeItems.map((item) => {
                  const isCertification =
                    /certified|certification|aws|google|azure|microsoft|comptia|cissp|ccna/i.test(
                      item.title
                    );
                  const badgeLabel = isCertification
                    ? 'Certification'
                    : 'Training';

                  return item.type === 'training' ? (
                    <div
                      key={item.id}
                      className='rounded-lg border border-accent-main/20 bg-accent-main/5 p-4 space-y-2'
                    >
                      <div className='flex items-start justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-1'>
                            <span className='inline-block rounded-full bg-accent-main/20 px-3 py-1 text-xs font-semibold text-accent-main'>
                              {badgeLabel}
                            </span>
                          </div>
                          <h3 className='text-lg font-semibold'>
                            {item.title}
                          </h3>
                        </div>
                        <p className='text-sm font-bold whitespace-nowrap'>
                          {item.endDate}
                        </p>
                      </div>

                      <p className='text-sm text-muted-foreground'>
                        {item.companyUrl ? (
                          <CustomLink href={item.companyUrl}>
                            {item.role}
                          </CustomLink>
                        ) : (
                          item.role
                        )}
                      </p>

                      {session?.user?.admin && (
                        <div className='flex gap-2 pt-2'>
                          <Button
                            className='custom-button text-xs'
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>

                          <Button
                            className='custom-button text-xs'
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : item.type === 'project' ? (
                    <div key={item.id} className='space-y-2'>
                      <h3 className='text-lg font-semibold'>{item.title}</h3>

                      <p className='font-medium'>
                        {item.companyUrl ? (
                          <CustomLink href={item.companyUrl}>
                            {item.role}
                          </CustomLink>
                        ) : (
                          item.role
                        )}
                      </p>

                      <p className='text-sm text-gray-500'>
                        {`${item.startDate} - ${item.endDate}`}
                        {item.location ? ` · ${item.location}` : ''}
                      </p>

                      {session?.user?.admin && (
                        <div className='flex gap-2 pt-2'>
                          <Button
                            className='custom-button text-sm'
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>

                          <Button
                            className='custom-button text-sm'
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}

                      {item.descriptions.length > 0 &&
                        (item.descriptions.length === 1 ? (
                          <p className='mt-2 text-base text-muted-foreground'>
                            {item.descriptions[0]}
                          </p>
                        ) : (
                          <ul className='mt-2 list-disc pl-5'>
                            {item.descriptions.map((desc) => (
                              <li key={desc}>{desc}</li>
                            ))}
                          </ul>
                        ))}
                    </div>
                  ) : (
                    <div key={item.id} className='space-y-2'>
                      <h3 className='text-lg font-semibold'>
                        {item.companyUrl ? (
                          <CustomLink href={item.companyUrl}>
                            {item.title}
                          </CustomLink>
                        ) : (
                          item.title
                        )}
                      </h3>

                      <p className='font-medium'>{item.role}</p>

                      <p className='text-sm text-gray-500'>
                        {`${item.startDate} - ${item.endDate}`}
                        {item.location ? ` · ${item.location}` : ''}
                      </p>

                      {session?.user?.admin && (
                        <div className='flex gap-2 pt-2'>
                          <Button
                            className='custom-button text-sm'
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>

                          <Button
                            className='custom-button text-sm'
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}

                      {item.descriptions.length > 0 &&
                        (item.descriptions.length === 1 ? (
                          <p className='mt-2 text-base text-muted-foreground'>
                            {item.descriptions[0]}
                          </p>
                        ) : (
                          <ul className='mt-2 list-disc pl-5'>
                            {item.descriptions.map((desc) => (
                              <li key={desc}>{desc}</li>
                            ))}
                          </ul>
                        ))}
                    </div>
                  );
                })
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <PortfolioModal
        open={showPortfolioModal}
        portfolio={selectedPortfolio}
        selectedType={selectedPortfolio ? undefined : activeType}
        closeModal={() => {
          setShowPortfolioModal(false);
          setSelectedPortfolio(null);
        }}
      />
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
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession<AuthOptions, CustomSession>(
    context.req,
    context.res,
    authOptions
  );

  const portfolio = await getPortfolio();

  return {
    props: {
      portfolio,
      session
    }
  };
};
