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
          DEFAULT: '#1e40af', // Professional blue
          dark: '#1e3a8a',
          light: '#3b82f6',
        },
        accent: {
          DEFAULT: '#059669', // Trust green
          dark: '#047857',
          light: '#10b981',
        },
        success: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
          light: '#f87171',
        },
        // Professional grays
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Trading specific colors
        up: '#10b981', // Green for gains
        down: '#ef4444', // Red for losses
        neutral: '#6b7280', // Gray for neutral
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-professional': 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 40px rgba(0, 0, 0, 0.16)',
        'glow': '0 0 20px rgba(30, 64, 175, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
