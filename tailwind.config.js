import colors from 'tailwindcss/colors'
import formPlugin from '@tailwindcss/forms'
import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      primary: '#1c7cd5',
      'primary-darker': '#0b68bd',
      bg: '#ffffff',
      secondary: '#5bc0de',
      success: {
        bg: '#e2eed8',
        fg: '#4b713d',
        bd: '#d5e6c7',
      },
      card: '#eceeef',
      head: {
        1: '#707070',
      },
      body: {
        1: '#373a3c',
      },
      subtitle: {
        1: '',
      },
      error: '#cb2e25',
      danger: {
        bg: '#efdfdf',
        fg: '#9f4f48',
        bd: '#e7cecd',
      },
    },
    extend: {},
  },
  plugins: [formPlugin, flowbitePlugin],
}
