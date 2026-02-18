/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amplemarket Replica Palette
        brand: {
          dark: '#0B0C15', // Deep Space Black (Feature Section)
          light: '#FFFFFF', // Hero Background
          purple: '#7C3AED', // Primary Accent
          orange: '#F97316', // Gradient Accent
          text: '#0F172A', // Main Text (Light Mode)
          textDark: '#F8FAFC', // Main Text (Dark Mode)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
