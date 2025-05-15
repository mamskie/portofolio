import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiTrash } from 'react-icons/hi2';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { formatFullTimeStamp, formatTimestamp } from '@lib/format';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Button } from '@components/ui/button';
import { Tooltip } from '@components/ui/tooltip';
import { LazyImage } from '@components/ui/lazy-image';
import type { MotionProps } from 'framer-motion';
import type { CustomSession } from '@lib/types/api';
import type { Guestbook } from '@lib/types/guestbook';

type GuestbookEntryProps = Guestbook & {
  session: CustomSession | null;
  unRegisterGuestbook: (id: string) => Promise<void>;
};

export function GuestbookEntry({
  id,
  text,
  name,
  image,
  session,
  email,
  username,
  createdAt,
  createdBy,
  provider,
  unRegisterGuestbook
}: GuestbookEntryProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleUnRegisterGuestbook = async (): Promise<void> => {
    setLoading(true);
    await unRegisterGuestbook(id);
  };

  const isOwner = session?.user.id === createdBy || session?.user.admin;

  const profileUrl =
    provider === 'google'
      ? `mailto:${username}` // karena username = email
      : `https://github.com/${username}`;

  return (
    <motion.article
      className='main-border relative grid grid-cols-[auto,1fr] gap-3 rounded-md p-4'
      layout='position'
      {...variants}
    >
      <UnstyledLink className='smooth-tab' href={profileUrl}>
        <LazyImage
          className='main-border rounded-full transition hover:brightness-75'
          src={image}
          alt={name}
          width={48}
          height={48}
        />
      </UnstyledLink>
      <div className='min-w-0'>
        <div className='mr-10 flex items-end gap-2'>
          <UnstyledLink
            className='custom-underline truncate font-bold flex items-center gap-x-2'
            title={name}
            href={profileUrl}
          >
            {provider === 'google' ? (
              <SiGoogle className='h-4 w-4 text-blue-500' />
            ) : (
              <SiGithub className='h-4 w-4 text-gray-500' />
            )}
            <span>{name}</span>
            {email === 'khotib.bul@gmail.com' && (
              <VscVerifiedFilled className='h-4 w-4 text-blue-500' />
            )}
          </UnstyledLink>
          <Tooltip
            className='whitespace-nowrap'
            tip={formatFullTimeStamp(createdAt)}
          >
            <button className='custom-underline peer cursor-pointer text-sm text-gray-600 dark:text-gray-300'>
              {formatTimestamp(createdAt)}
            </button>
          </Tooltip>
        </div>
        <p className='break-words'>{text}</p>
      </div>
      {isOwner && (
        <Button
          className='custom-underline main-border clickable !absolute right-2 top-2 
                     rounded-md p-1.5 text-red-400'
          loading={loading}
          type='button'
          onClick={handleUnRegisterGuestbook}
        >
          <HiTrash className='h-5 w-5' />
        </Button>
      )}
    </motion.article>
  );
}

const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
