/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#1c7cd5',
      bg: '#ffffff',
      secondary: '#5bc0de',
      success: {
        bg: '#e2eed8',
        fg: '#4b713d',
        bd: '#d5e6c7',
      },
      card: '#eceeef',
      danger: {
        bg: '#efdfdf',
        fg: '#9f4f48',
        bd: '#e7cecd',
      },
    },
    extend: {},
  },
  plugins: [],
}
