import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SiSearxng } from 'react-icons/si';
import { searchData } from '@lib/search-data';
import type { SearchItem } from '@lib/search-data';

export default function SearchBar(): JSX.Element {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setHighlightIndex(-1);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setHighlightIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < results.length) {
        void router.push(results[highlightIndex].href);
      }
    }
  };

  return (
    <div className='w-full max-w-sm h-10 ml-6 relative'>
      <div className='flex items-center rounded-md border bg-white px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-accent-main dark:bg-black h-full'>
        <input
          type='text'
          placeholder='Search...'
          className='w-full bg-transparent outline-none'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
        <SiSearxng className='mr-2 h-4 w-4 text-gray-400 shrink-0' />
      </div>

      {isFocused && query.trim() !== '' && (
        <div className='absolute z-10 mt-2 w-full rounded-md border bg-white p-2 shadow-md dark:bg-black'>
          {results.length > 0 ? (
            results.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className={`block rounded px-2 py-1 text-sm transition-colors ${
                  highlightIndex === index
                    ? 'bg-accent-main'
                    : 'hover:bg-accent-main'
                }`}
              >
                {item.title}
              </a>
            ))
          ) : (
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='block rounded text-center px-2 py-1 text-sm text-accent-main hover:underline'
            >
              Result not found.
              <br /> Search on Google →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
