/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: 'Jost',
        playfair: 'Playfair Display',
        protest: 'Protest Revolution',
      },
      colors: {
        primary: '',
        theme: '#F73C03',
      },
    },
  },
  plugins: [],
};
