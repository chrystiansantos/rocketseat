import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#3294f8',
        title: '#E7EDF4',
        subtitle: '#C4D4E3',
        text: '#AFC2D4',
        span: '#7B96B2',
        label: '#3A536B',
        border: '#1C2F41',
        post: '#112131',
        profile: '#0B1B2B',
        background: '#071422',
        input: '#040F1A',
      },
    },
  },
  plugins: [],
}
export default config
