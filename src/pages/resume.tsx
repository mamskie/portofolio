import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';

import ResumeSection from '@components/resume/ResumeSection';
import ResumeItem from '@components/resume/ResumeItem';

export default function Resume(): JSX.Element {
  return (
    <main className='space-y-16'>
      <SEO
        title='Resume - Mamskie'
        description='My professional resume including education, experience, and certifications.'
      />

      <section className='space-y-4'>
        <motion.h1 className='text-4xl font-bold' {...setTransition()}>
          <Accent>Resume</Accent>
        </motion.h1>
        <p className='text-gray-600 dark:text-gray-300'>
          Ringkasan pendidikan, pengalaman, dan sertifikasi profesional saya.
        </p>
      </section>

      <motion.div className='space-y-10' {...setTransition({ delayIn: 0.1 })}>
        <ResumeSection title='🎓 Education'>
          <ResumeItem
            title='S1 Sistem Informasi'
            subtitle='UIN Sunan Ampel Surabaya'
            dateRange='2019 – 2023'
          />
        </ResumeSection>

        <ResumeSection title='💼 Experience'>
          <ResumeItem
            title='Magang – PT Pelindo Regional 3'
            subtitle='Audit Internal & Web App Developer'
            dateRange='2023 – Sekarang'
            description='Mengembangkan aplikasi audit internal, melakukan analisis hasil audit dan menyusun toolkit assessment Greenport/Smartport.'
          />
          <ResumeItem
            title='Magang – PT Pelindo'
            subtitle='Sistem Informasi Manajemen Arsip'
            dateRange='2022 – 2023'
            description='Membangun sistem manajemen arsip berbasis Laravel dan REST API.'
          />
        </ResumeSection>

        <ResumeSection title='📜 Certifications'>
          <ResumeItem
            title='Dicoding'
            subtitle='Belajar Membuat Aplikasi Web dengan React'
          />
          <ResumeItem
            title='Google (Coursera)'
            subtitle='IT Project Management'
          />
        </ResumeSection>
      </motion.div>
    </main>
  );
}
