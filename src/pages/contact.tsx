import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiX, SiInstagram } from 'react-icons/si';
import { MdLocationOn } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';

export default function Contact(): JSX.Element {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setForm({ name: '', email: '', message: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className='container mx-auto px-4 py-16 max-w-3xl'>
      <motion.h1
        className='text-4xl font-bold text-center mb-4'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.h1>
      <p className='text-center text-gray-600 dark:text-gray-300 mb-12'>
        Feel free to get in touch and let&apos;s have a discussion about how we
        can work together.
      </p>

      <form onSubmit={handleSubmit} className='grid gap-4'>
        <input
          type='text'
          name='name'
          placeholder='Your Name'
          required
          value={form.name}
          onChange={handleChange}
          className='input-style'
        />
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          required
          value={form.email}
          onChange={handleChange}
          className='input-style'
        />
        <textarea
          name='message'
          placeholder='Your Message'
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className='input-style'
        />
        <button
          type='submit'
          className='custom-button flex items-center gap-2 justify-center'
          disabled={status === 'sending'}
        >
          <FiSend /> {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && (
          <p className='text-green-600'>Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className='text-red-600'>
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      <div className='mt-16 space-y-4 text-center text-gray-700 dark:text-gray-300'>
        <p className='flex justify-center items-center gap-2'>
          <FiMail /> khotib.bul@gmail.com
        </p>
        <p className='flex justify-center items-center gap-2'>
          <SiLinkedin />{' '}
          <a href='https://www.linkedin.com/in/mamskie/' target='_blank'>
            LinkedIn
          </a>
        </p>
        <p className='flex justify-center items-center gap-2'>
          <SiX />{' '}
          <a href='https://twitter.com/mam06_' target='_blank'>
            @mam06_
          </a>
        </p>
        <p className='flex justify-center items-center gap-2'>
          <SiInstagram />{' '}
          <a href='https://instagram.com/khtblmam__' target='_blank'>
            @khtblmam__
          </a>
        </p>
        <p className='flex justify-center items-center gap-2'>
          <SiGithub />{' '}
          <a href='https://github.com/mamskie' target='_blank'>
            github.com/mamskie
          </a>
        </p>
        <p className='flex justify-center items-center gap-2'>
          <MdLocationOn /> Surabaya
        </p>
        <p className='flex justify-center items-center gap-2'>
          <BsTelephone /> 085745319625
        </p>
      </div>
    </main>
  );
}

// Tambahkan style yang dibutuhkan (TailwindCSS assumed)
// .input-style dan .custom-button sudah disiapkan sebelumnya di project stylingmu
