const { defaultConfig } = require('@dot/ui/tailwind');
const { mergeConfigs } = require('tailwind-merge');
const lodash = require('lodash');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
module.exports = mergeConfigs(lodash.omit(defaultConfig, 'colors'), {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  },
  safelist: ['alert-success', 'alert-warning', 'alert-error', 'alert-info']
});
