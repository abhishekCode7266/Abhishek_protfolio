/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-light': 'var(--surface-light)',
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'text-muted': 'var(--text-muted)',
      },
    },
  },
  plugins: [],
};
