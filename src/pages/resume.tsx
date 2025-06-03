import { motion } from 'framer-motion'; 
import type { TargetAndTransition, Transition } from 'framer-motion';

interface SetTransitionReturnType {
  initial: TargetAndTransition; 
  animate: TargetAndTransition; 
  transition: Transition; 
}

function setTransition(options?: { delayIn?: number }): SetTransitionReturnType {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: options?.delayIn ?? 0 }
  };
}

function SEO({ title, description }: { title: string; description: string }): JSX.Element {
  return (
    <>
      <title>{title}</title>
      <meta name='description' content={description} />
    </>
  );
}

function Accent({ children }: { children: React.ReactNode }): JSX.Element {
  return <span className='text-accent-main'>{children}</span>;
}

function CustomLink({ href, children, tabIndex, className }: { href: string; children: React.ReactNode; tabIndex?: number; className?: string }): JSX.Element {
  return <a href={href} target='_blank' rel='noopener noreferrer' tabIndex={tabIndex} className={`text-blue-400 hover:underline ${className}`}>{children}</a>;
}


export default function Resume(): JSX.Element {
  return (
    <main className='layout min-h-screen'>
      <SEO
        title='Resume - M. Khotibul Umam'
        description='Resume of M. Khotibul Umam, an Information Systems graduate with expertise in IT management, risk management, web development, and system integration.'
      />
      <section className='grid gap-2'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>M. KHOTIBUL UMAM</Accent>
        </motion.h1>
        <motion.p
          className='text-lg md:text-xl text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          +6285745319625 | khotib.bul@gmail.com | <CustomLink href='https://www.linkedin.com/in/mamskie/'>https://www.linkedin.com/in/mamskie/</CustomLink>
        </motion.p>
        <motion.p
          className='mt-4 text-gray-200'
          {...setTransition({ delayIn: 0.2 })}
        >
          Experienced in the field of Information Systems with expertise in IT management, risk management, web development, and system
          integration. Highly motivated to learn, solution-oriented thinker, and able to adapt quickly in various situations. Ready to contribute
          effectively and grow together with the team.
        </motion.p>
      </section>

      <section className='mt-8'>
        <motion.h2
          className='text-xl font-bold md:text-3xl border-b border-gray-600 pb-2'
          {...setTransition({ delayIn: 0.3 })}
        >
          Education Level
        </motion.h2>
        <motion.div className='mt-4' {...setTransition({ delayIn: 0.4 })}>
          <h3 className='text-lg font-semibold text-white'>UIN Sunan Ampel - Surabaya, Indonesia <span className='float-right text-gray-400'>Aug 2020 - Jan 2024</span></h3>
          <p className='text-gray-300'>Bachelor of Information System, 3.59/4.00</p>
          <ul className='list-disc list-inside text-gray-400 mt-2'>
            <li>Certified Junior Computer Operator – BNSP</li>
            <li>Certified Data Scientist – BNSP</li>
            <li>Completed Fundamental Web Programming course by Hactiv8</li>
          </ul>
        </motion.div>
        <motion.div className='mt-4' {...setTransition({ delayIn: 0.5 })}>
          <h3 className='text-lg font-semibold text-white'>MAN 1 BLITAR - Blitar, Indonesia <span className='float-right text-gray-400'>Aug 2016 - Mar 2019</span></h3>
        </motion.div>
      </section>

      <section className='mt-8'>
        <motion.h2
          className='text-xl font-bold md:text-3xl border-b border-gray-600 pb-2'
          {...setTransition({ delayIn: 0.6 })}
        >
          Work Experiences
        </motion.h2>
        <motion.div className='mt-4' {...setTransition({ delayIn: 0.7 })}>
          <h3 className='text-lg font-semibold text-white'>PT Pelabuhan Indonesia Regional 3 - Surabaya, East Java, Indonesia <span className='float-right text-gray-400'>Jul 2024 - Present</span></h3>
          <p className='text-gray-300'>System Management, Risk Management, Governance, and Compliance</p>
          <ul className='list-disc list-inside text-gray-400 mt-2'>
            <li>Assisted in conducting internal audits across multiple branches and sub-regional offices in compliance with ISO 9001, ISO 14001, ISPS Code, and SMK3 standards to ensure adherence to quality, environmental, security, and occupational safety management systems.</li>
            <li>Managed and analyzed audit results from various work units to identify trends, detect discrepancies, and provide improvement recommendations to enhance operational effectiveness.</li>
            <li>Oversaw the internal audit activities of Pelindo Regional 3, ensuring all units comply with operational standards and risk management procedures.</li>
            <li>Contributed to the planning and development of a Business Continuity Management (BCM) flow scheme for cyber-attack scenarios, aiming to strengthen preparedness and ensure business continuity.</li>
          </ul>
        </motion.div>
        <motion.div className='mt-4' {...setTransition({ delayIn: 0.8 })}>
          <h3 className='text-lg font-semibold text-white'>PT Presindo Central - Tangerang, Banten, Indonesia <span className='float-right text-gray-400'>Feb 2023 - Mar 2023</span></h3>
          <p className='text-gray-300'>Management Information System</p>
          <ul className='list-disc list-inside text-gray-400 mt-2'>
            <li>Developed a web-based archive management information system using Laravel and Bootstrap to enhance efficiency and accuracy in the company’s document handling.</li>
            <li>Implemented CRUD (Create, Read, Update, Delete) functionalities to enable secure and structured data management for archives.</li>
            <li>Integrated REST API to facilitate real-time data exchange between the web application and backend services.</li>
          </ul>
        </motion.div>
      </section>

      <section className='mt-8'>
        <motion.h2
          className='text-xl font-bold md:text-3xl border-b border-gray-600 pb-2'
          {...setTransition({ delayIn: 0.9 })}
        >
          Organisational Experience
        </motion.h2>
        <motion.div className='mt-4' {...setTransition({ delayIn: 1.0 })}>
          <h3 className='text-lg font-semibold text-white'>KMB Uinsa - Surabaya, East Java, Indonesia <span className='float-right text-gray-400'>Jul 2021 - Feb 2023</span></h3>
          <p className='text-gray-300'>Coordinator of Communication and Information Division</p>
          <ul className='list-disc list-inside text-gray-400 mt-2'>
            <li>Managed all internal communication channels within the organization to ensure effective and efficient information delivery among members.</li>
            <li>Developed and implemented external communication strategies, including maintaining good relationships with external parties and partners.</li>
            <li>Collaborated with various departments to ensure timely and relevant dissemination of information for each organizational program.</li>
            <li>Created creative content, publications, and documentation for organizational events and activities.</li>
            <li>Acted as a communication bridge between the core board and all members in various activities and programs.</li>
          </ul>
        </motion.div>
        <motion.div className='mt-4' {...setTransition({ delayIn: 1.1 })}>
          <h3 className='text-lg font-semibold text-white'>PMII Rayon Tarbiyah - Surabaya, Indonesia <span className='float-right text-gray-400'>Aug 2022 - Apr 2023</span></h3>
          <p className='text-gray-300'>Staff of Dynamics Division</p>
          <ul className='list-disc list-inside text-gray-400 mt-2'>
            <li>Assisted in managing internal communication to support the smooth implementation of departmental programs.</li>
            <li>Responsible for managing social media channels related to event promotion and organizational activities.</li>
            <li>Collaborated with other divisions to support information and publication needs for each program.</li>
            <li>Supported the creation of creative content, publication designs, and documentation of departmental activities.</li>
          </ul>
        </motion.div>
      </section>

      <section className='mt-8'>
        <motion.h2
          className='text-xl font-bold md:text-3xl border-b border-gray-600 pb-2'
          {...setTransition({ delayIn: 1.2 })}
        >
          Project Experience
        </motion.h2>
        <motion.div className='mt-4' {...setTransition({ delayIn: 1.3 })}>
          <h3 className='text-lg font-semibold text-white'>Dashboard for Water Quality Changes in Banjarmasin (2023)</h3>
          <p className='text-gray-300'>Created a data visualization dashboard using Power BI, enabling users to quickly view and effectively interpret complex datasets.</p>
        </motion.div>
      </section>
    </main>
  );
}
