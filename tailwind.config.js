/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f7f1e8',
        ink: '#1d1a17',
        accent: '#1f6f78',
        ember: '#c7653b',
        mist: '#ebe2d7'
      },
      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['Manrope', 'Avenir Next', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        card: '0 24px 60px rgba(29, 26, 23, 0.12)'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(31, 111, 120, 0.18), transparent 48%), radial-gradient(circle at top right, rgba(199, 101, 59, 0.16), transparent 42%)'
      }
    }
  },
  plugins: []
};