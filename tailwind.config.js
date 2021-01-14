const defaultTheme = require('tailwindcss/defaultTheme')

const fontFamily = {
  ...defaultTheme.fontFamily,
  sans: [
    'Poppins', // new font
    'Open Sans',
    ...defaultTheme.fontFamily.sans,
  ],
}

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/index.html',
      './src/**/*.html',
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
    ],
  },

  // These options are passed through directly to PurgeCSS
  options: {
    safelist: [
      //   'select',
      //   'select__input',
      //   'select__icon',
      //   'input',
      //   'paragraph',
      //   'search',
      //   'search__input',
      //   'search__icon',
      //   'icon-button',
      //   'table',
      //   'bordered',
      //   'stripped',
      //   'student-table',
      //   'officials-table',
    ],
  },

  theme: {
    extend: {},
    fontFamily,
  },
  variants: {},
  plugins: [],
}
