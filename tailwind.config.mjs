/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lucidia-blue': '#2563eb',
        'lucidia-light': '#f9fafb',
        'lucidia-dark': '#1e3a8a',
        'lucidia-text': '#1f2937',
        'yd-yellow': '#FFD700',
        'yd-black': '#1E1E1E',
        'yd-gray': '#F5F5F5',
        'yd-red': '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

