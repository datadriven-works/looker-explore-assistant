// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Google Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        // 'radial-gradient': "var(--chat-secondary-color)",
      },
      colors: {
        primary: "var(--primary-color)", // Google Blue
        secondary: "var(--secondary-color)", // Google Red
        tertiary: "var(--tertiary-color)", // Google Yellow
        quaternary: "var(--quaternary-color)", // Google Green
        chat: "var(--chat-color)",
        'radial-gradient': "var(--chat-secondary-color)",
        gray: {
          ...defaultTheme.colors.gray,
          900: 'var(--text-primary-color)', 
          800: 'var(--text-secondary-color)',
          700: 'var(--text-tertiary-color)',
        },
        'prompt-primary': 'var(--prompt-primary-color)',
        'prompt-secondary': 'var(--prompt-secondary-color)',
        'settings-primary': 'var(--settings-primary-color)'
      },
    },
  },
  plugins: [],
}
