/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Inclui todos os arquivos JavaScript e TypeScript em src/
    './pages/**/*.{js,ts,jsx,tsx}', // Inclui todos os arquivos JavaScript e TypeScript em pages/
    './components/**/*.{js,ts,jsx,tsx}', // Inclui todos os arquivos JavaScript e TypeScript em components/
    // Adicione qualquer outro caminho que contenha suas classes CSS personalizadas
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1.5px',
      },
      screens: {
        nav: '900px',
      },
      colors: {
        primary: '#16151a',
        secondary: '#35343c',
        tertiary: '#1f1e26',
        quaternary: '#2f2e34',
        quinary: '#454349',
      },
      animation: {
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'translateY(-4px)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'translateY(0px)', opacity: 1 },
          '100%': { transform: 'translateY(-4px)', opacity: 0 },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [],
};
