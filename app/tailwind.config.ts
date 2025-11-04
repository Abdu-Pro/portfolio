import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',  // Added .mdx for safety
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#006400',
        navy: '#000080',
        'neon-blue': '#00FFFF',
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
};

export default config;