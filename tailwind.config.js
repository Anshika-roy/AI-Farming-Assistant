/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0F2818',
          900: '#153B24',
          800: '#1B4332',
          700: '#235A3F',
          600: '#2D6A4F',
          500: '#40916C',
          400: '#52B788',
          300: '#74C69D',
          200: '#B7E4C7',
          100: '#D8F3DC',
          50: '#F1FAF3',
        },
        clay: {
          600: '#B8791F',
          500: '#D4A017',
          400: '#E8B93D',
          100: '#FBF0D9',
        },
        sky: {
          600: '#2563A6',
          500: '#3B82C4',
          100: '#E3F1FB',
        },
        berry: {
          600: '#B84A5E',
          500: '#D4657A',
          100: '#FBE7EA',
        },
        ink: {
          900: '#152018',
          700: '#3A4A40',
          500: '#6B786F',
          300: '#A8B3AC',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(21, 59, 36, 0.06), 0 1px 2px rgba(21, 59, 36, 0.04)',
        card: '0 4px 24px rgba(21, 59, 36, 0.08)',
        lift: '0 12px 32px rgba(21, 59, 36, 0.14)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        wave: 'wave 2.4s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
