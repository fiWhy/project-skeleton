const { colors: colorsPlugin } = require('./plugins/index.cjs');
const { varToColor, palette, keyframes } = require('./themes/index.cjs');
const { Paths } = require('@dot-tools/js/paths');

/** @type {import('tailwindcss').Config} */
const defaultConfig = {
  content: [
    `${Paths.packages('ui')}/src/**/*.{ts,tsx}`,
    `${Paths.packages('ui')}/.storybook/preview.jsx`
  ],
  plugins: [colorsPlugin],
  theme: {
    fontFamily: {
      sans: [
        'Poppins',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'helvetica'
      ],
      mono: ['Lato', 'ui-monospace']
    },
    colors: {
      ...Object.keys(palette.dark).reduce(
        (acc, varName) => ({
          ...acc,
          [varName]: varToColor(`color-${varName}`)
        }),
        {}
      )
    },
    extend: {
      keyframes,
      animation: {
        float: 'float 4s ease-in-out infinite'
      },
      boxShadow: {
        messages: '2px 2px 5px #C3C3C3',
        field: '4px 4px 7px rgba(174, 174, 174, 0.25)',
        'phone-menu': '0px 4px 2px rgba(199, 199, 199, 0.25)',
        'small-geometry': '2px 2px 6px rgba(64, 51, 219, 0.42)',
        'header-geometry': '3.50249px 0.875622px 6.12935px #C8BAFF'
      },
      borderWidth: {
        31: '31px',
        23: '23px',
        10: '10px'
      },
      padding: {
        mobile: '19px'
      },
      fontSize: {
        '4.5xl': '2.75rem',
        '5.5xl': '3.25rem'
      },
      lineHeight: {
        11: '2.75rem',
        'main-heading': '140%',
        extra: '160%'
      }
    }
  }
};

module.exports = {
  defaultConfig
};
