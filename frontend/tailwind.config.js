/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        accent: {
          DEFAULT: '#a855f7',
          dark: '#9333ea',
          light: '#c084fc',
        },
        neon: {
          blue: '#00f0ff',
          purple: '#bf00ff',
          pink: '#ff00ff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-strong': '0 0 30px rgba(99, 102, 241, 0.8)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
