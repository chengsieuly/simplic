const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { getDefaultTheme } = require('./src/lib/utils/generate-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '../**/*.{ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...getDefaultTheme(),
      },
    },
  },
  plugins: [],
};
