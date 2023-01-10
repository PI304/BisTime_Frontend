/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Gmarket: ['GmarketSans', 'sans-serif'],
      },
      fontSize: {
        display: '3rem',
        h1: '2rem',
        h2: '1.7rem',
        h3: '1rem',
        p1: '0.875rem',
        p2: '0.813rem',
        p3: '0.75rem',
        p4: '0.625rem',
        p5: '0.5rem',
        b1: ['1.5rem', { fontWeight: 700 }],
        b2: ['1.125rem', { fontWeight: 700 }],
        b3: ['0.75rem', { fontWeight: 700 }],
      },
      colors: {
        base: {
          black: '#0C0C20',
          white: '#F6FAF9',
        },
        gray: {
          1: '#F2F2F7',
          2: '#E5E5EA',
          3: '#D1D1D6',
          4: '#C7C7CC',
          5: '#AEAEB2',
          6: '#8E8E93',
        },
        primary: {
          green: {
            1: '#52B69A',
            2: '#95DEAF',
            3: '#64736F',
          },
        },
        secondary: {
          orange: {
            1: '#F49C1B',
            2: '#FFC570',
            3: '#F8F0E4',
          },
        },
        system: {
          error: '#EA3E69',
          info: '#7EB803',
          success: '#3267DD',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
};
