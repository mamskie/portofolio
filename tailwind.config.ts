import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        marquee: 'marquee 10s linear infinite'
      },
      fontFamily: {
        inter: ['var(--font-inter)']
      },
      colors: {
        accent: {
          main: colors.cyan[400],
          start: colors.blue[500],
          end: colors.cyan[400]
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
