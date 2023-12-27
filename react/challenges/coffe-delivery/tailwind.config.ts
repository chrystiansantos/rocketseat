import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        baloo2: ['var(--font-baloo2)'],
      },
      borderRadius: {
        '2.25': '2.25rem',
      },
      gridTemplateColumns: {
        checkout: '1fr, 448px',
      },
      animation: {
        'show-alert': 'moving-alert 2s ease-in-out forwards',
        'hide-alert': 'hide-moving-alert 2s ease-in-out forwards',
      },
      keyframes: {
        'moving-alert': {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0',
          },
          '75%': {
            transform: 'translateY(-30px)',
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1',
          },
        },
        'hide-moving-alert': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '75%': {
            transform: 'translateY(-30px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100px)',
            opacity: '0',
          },
        },
      },
    },
    colors: {
      'yellow-dark': '#C47F17',
      yellow: '#DBAC2C',
      'yellow-light': '#F1E9C9',

      'purple-dark': '#4B2995',
      purple: '#8047F8',
      'purple-light': '#EBE5F9',

      title: '#272221',
      subtitle: '#403937',
      text: '#574F4D',
      label: '#8D8686',
      hover: '#D7D5D5',
      button: '#E6E5E5',
      input: '#EDEDED',
      card: '#F3F2F2',
      background: '#FAFAFA',
      white: '#fff',
    },
    screens: {
      sm: { max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px', max: '1535px' },
      '2xl': { min: '1536px' },
    },
  },

  plugins: [],
}
export default config
