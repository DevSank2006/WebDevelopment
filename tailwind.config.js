/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
      colors: { ink: 'hsl(var(--background))', panel: 'hsl(var(--card))', violet: '#7357ff', cyan: '#69dff2' },
      boxShadow: { glow: '0 12px 50px rgba(89, 87, 255, .24)' },
      backgroundImage: { 'hero-glow': 'radial-gradient(ellipse at 78% 24%, rgba(99,79,231,.17), transparent 37%), radial-gradient(ellipse at 5% 65%, rgba(25,111,174,.12), transparent 38%)' },
      keyframes: { float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } } },
      animation: { 'float-slow': 'float 6s ease-in-out infinite' }
    }
  },
  plugins: []
};
