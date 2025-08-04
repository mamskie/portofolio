import { AnimatePresence, motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { useEffect, useState, useRef } from 'react';
import { useNowPlayingTrack } from '@lib/hooks/useNowPlayingTrack';
import { setTransition } from '@lib/transition';
import { LazyImage } from '@components/ui/lazy-image';
import { UnstyledLink } from '@components/link/unstyled-link';
import { Tooltip } from '@components/ui/tooltip';
import type { IsPlaying } from '@lib/types/spotify';

export function SpotifyCard(): JSX.Element {
  const { track } = useNowPlayingTrack();

  const {
    trackUrl,
    albumName,
    trackName,
    isPlaying,
    artistName,
    albumImageUrl,
    progressMs,
    durationMs
  } = (track as IsPlaying) ?? {};

  function msToTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const [localProgress, setLocalProgress] = useState(progressMs ?? 0);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    setLocalProgress(progressMs ?? 0);
    lastUpdateTimeRef.current = Date.now();
  }, [progressMs]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastUpdateTimeRef.current;
      setLocalProgress((prev) => {
        const updated = prev + elapsed;
        if (updated >= (durationMs ?? 0)) {
          clearInterval(interval);
          return durationMs ?? 0;
        }
        return updated;
      });
      lastUpdateTimeRef.current = now;
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, durationMs]);

  const currentTime = msToTime(localProgress ?? 0);
  const progressPercent = durationMs
    ? Math.min((localProgress / durationMs) * 100, 100)
    : 0;

  const totalTime = msToTime(durationMs ?? 0);
  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div {...setTransition()}>
          <Tooltip
            tip='Currently playing on my Spotify'
            tooltipClassName='!-translate-y-32 group-hover:!-translate-y-36 peer-focus-visible:!-translate-y-36'
          >
            <UnstyledLink
              className='clickable main-border peer relative flex min-w-[320px] w-84 gap-4 rounded-md p-4'
              href={trackUrl ?? '/'}
            >
              {albumImageUrl && (
                <LazyImage
                  className='main-border w-16 h-16 rounded-md'
                  title={albumName}
                  src={albumImageUrl}
                  alt={albumName}
                  width={64}
                  height={64}
                />
              )}

              <div className='flex-1 grid gap-0.5 w-full'>
                <div className='flex items-center gap-1 text-sm font-medium text-black dark:text-white'>
                  <SiSpotify className='text-[#1ed760]' />
                  <div className='relative overflow-hidden w-full'>
                    <p
                      className='marquee text-sm font-medium text-accent-main whitespace-nowrap animate-marquee'
                      title={trackName}
                    >
                      {trackName}
                    </p>
                  </div>
                </div>

                <div className='relative overflow-hidden w-full'>
                  <p
                    className='text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap animate-marquee'
                    title={artistName}
                  >
                    by <span>{artistName}</span>
                  </p>
                </div>

                <div className='relative overflow-hidden w-full'>
                  <p
                    className='text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap animate-marquee'
                    title={albumName}
                  >
                    on <span>{albumName}</span>
                  </p>
                </div>

                <div className='mt-2'>
                  <div className='mb-1 flex justify-between text-[10px] text-gray-500 dark:text-gray-400'>
                    <span>{currentTime}</span>
                    <span>{totalTime}</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700'>
                    <div
                      className='h-full rounded-full bg-accent-main transition-all duration-500 ease-in-out'
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </UnstyledLink>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
