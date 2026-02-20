import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0',
        'ivory-dark': '#F2EDE2',
        champagne: '#C9A96E',
        'champagne-light': '#E8D5B0',
        'champagne-dark': '#A8834A',
        charcoal: '#1C1917',
        'charcoal-soft': '#44403C',
        stone: '#78716C',
        'stone-light': '#D6D3CE',
        olive: '#6B7155',
        'olive-light': '#E8EADF',
        'warm-gray': '#E7E3DC',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Tajawal"', 'Georgia', 'serif'],
        sans: ['"Tajawal"', '"Manrope"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(28,25,23,0.06)',
        card: '0 2px 12px 0 rgba(28,25,23,0.08)',
        'card-hover': '0 8px 32px 0 rgba(28,25,23,0.12)',
      },
      spacing: {
        18: '72px',
        22: '88px',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
