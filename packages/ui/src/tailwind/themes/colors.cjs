const { colord } = require('colord');
const { toCssRgb } = require('./utils.cjs');

const Theme = {
  Dark: 'dark',
  Light: 'light'
};

const sharedColors = {
  transparent: 'transparent',
  'natural-white': toCssRgb(colord('#fff').toRgb()),
  'natural-black': toCssRgb(colord('#000').toRgb()),
  'natural-grey-100': toCssRgb(colord('#F7F7F9').toRgb()),
  'natural-grey-90': toCssRgb(colord('#F5F5F5').toRgb()),
  'natural-yellow': toCssRgb(colord('#FFFBF4').toRgb()),
  'primary-red': toCssRgb(colord('#FF7B7B').toRgb()),
  'primary-blue': toCssRgb(colord('#6666FF').toRgb()),
  'primary-purple': toCssRgb(colord('#9479FF').toRgb()),
  'secondary-green': toCssRgb(colord('#C5FF7B').toRgb()),
  'secondary-pink': toCssRgb(colord('#FF79FA').toRgb()),
  'secondary-purple-100': toCssRgb(colord('#9479FF').toRgb()),
  'secondary-purple-90': toCssRgb(colord('#DC79FF').toRgb()),
  'secondary-light-blue': toCssRgb(colord('#AEE2FF').toRgb()),
  'secondary-dark-yellow': toCssRgb(colord('#FFEA7E').toRgb()),
  'secondary-grey-100': toCssRgb(colord('#5A5A5A').toRgb()),
  'secondary-grey-90': toCssRgb(colord('#A9A9A9').toRgb()),
  'secondary-grey-80': toCssRgb(colord('#C6C6C6').toRgb()),
  'secondary-grey-70': toCssRgb(colord('#EEEEEE').toRgb()),
  'secondary-blue-100': toCssRgb(colord('#3C3CE1').toRgb())
};

const palette = {
  dark: {
    ...sharedColors
  },
  light: {
    ...sharedColors
  }
};

module.exports = {
  palette,
  Theme
};
