import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#e1e9f3',
          200: '#c3d3e7',
          300: '#95b3d6',
          400: '#618dc2',
          500: '#3d6ea9',
          600: '#2d568c',
          700: '#254571',
          800: '#1e385c',
          900: '#0f172a', // Deep navy
          950: '#0a0f1d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
