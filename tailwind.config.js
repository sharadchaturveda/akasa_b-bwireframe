/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'playfair': ['var(--font-playfair)', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'lora': ['var(--font-lora)', 'serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        'fadeSlideUp': 'fadeSlideUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      textShadow: {
        DEFAULT: '0 2px 4px rgba(0,0,0,0.3)',
        'sm': '0 1px 2px rgba(0,0,0,0.3)',
        'lg': '0 4px 8px rgba(0,0,0,0.3)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeSlideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const textShadows = theme('textShadow', {});
      const utilities = Object.entries(textShadows).map(([key, value]) => {
        return {
          [`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
            textShadow: value,
          },
        };
      });
      addUtilities(utilities);
    },
  ],
}
