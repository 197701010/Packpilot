/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D92D20',                // Rood
          'primary-foreground': '#FFFFFF',   // WIT (voor tekst op de rode knop)
          accent: '#FDB022',                 // Geel
        },
        dark: '#101828',      // Zwart voor tekst
        light: '#FFFFFF',     // Wit
        subtle: '#F8F9FA',    // Zeer lichte grijstint
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;