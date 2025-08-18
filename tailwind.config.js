/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8102E',
          dark: '#8E0D22',
        },
        accent: {
          DEFAULT: '#FFD166',
          dark: '#E6B84F',
        },
        neutral: {
          950: '#0B0B0F',
          800: '#1F2329',
          600: '#4B5563',
          300: '#D1D5DB',
          100: '#F5F6F8',
        },
        surface: '#FFFFFF',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        'ar': ['Tajawal', 'system-ui', 'sans-serif'],
        'en': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.2', fontWeight: '800' }],
        'h1': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h2': ['30px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'tiny': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'card': '0 10px 24px 0 rgba(0,0,0,0.08)',
        'hover': '0 14px 28px 0 rgba(0,0,0,0.12)',
        'soft': '0 6px 16px rgba(0,0,0,0.06)',
      },
      spacing: {
        '6': '6px',
        '10': '10px',
        '14': '14px',
        '20': '20px',
        '28': '28px',
        '36': '36px',
      },
      screens: {
        'xs': '360px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
