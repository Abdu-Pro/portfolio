import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',  // Scans app/ folder (includes page.tsx)
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // For legacy if needed
    './components/**/*.{js,ts,jsx,tsx,mdx}', // If you add components later
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