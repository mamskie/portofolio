import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { SEO } from '@components/common/seo';
import { Accent } from '@components/ui/accent';

export default function Blog(): JSX.Element {
  return (
    <main className='min-h-screen'>
      <SEO
        title='Blog'
        description='Blog section is currently under maintenance.'
      />

      <section className='grid gap-4'>
        <motion.h1
          className='text-3xl font-bold md:text-5xl'
          {...setTransition()}
        >
          <Accent>Blog</Accent>
        </motion.h1>

        <motion.p
          className='text-gray-600 dark:text-gray-300'
          {...setTransition({ delayIn: 0.1 })}
        >
          This section is currently under maintenance.
        </motion.p>

        <motion.div
          className='mt-8 rounded-xl border p-8 text-center'
          {...setTransition({ delayIn: 0.2 })}
        >
          <h2 className='text-2xl font-semibold'>Coming Soon 🚀</h2>

          <p className='mt-2 text-gray-500'>
            Articles and technical write-ups will be published here in the
            future.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
