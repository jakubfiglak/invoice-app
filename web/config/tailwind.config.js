/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'lavender-purple': '#7C5DFA',
      periwinkle: '#9277FF',
      'night-blue': '#1E2139',
      'blue-sapphire': '#252945',
      'light-steel-blue': '#DFE3FA',
      'light-slate-gray': '#888EB0',
      'slate-gray': '#494E6E',
      'steel-blue': '#7E88C3',
      'black-russian': '#0C0E16',
      'coral-red': '#EC5757',
      'pastel-red': '#FF9797',
      'white-smoke': '#F8F8FB',
      eclipse: '#141625',
      white: '#FFFFFF',
      whisper: '#F9FAFE',
      martian: '#373B53',
    },
    fontSize: {
      xs: [
        '0.6875rem',
        {
          lineHeight: '1.125rem',
          letterSpacing: '-0.02em',
        },
      ],
      sm: [
        '0.75rem',
        {
          lineHeight: '0.9375rem',
          letterSpacing: '-0.02em',
        },
      ],
      md: [
        '1rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '-0.05em',
        },
      ],
      lg: [
        '1.25rem',
        {
          lineHeight: '1.375rem',
          letterSpacing: '-0.03em',
        },
      ],
      xl: [
        '2rem',
        {
          lineHeight: '2.25rem',
          letterSpacing: '-0.03em',
        },
      ],
    },
    extend: {
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
