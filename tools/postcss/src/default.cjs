/** @type {import('postcss-load-config').Config} */
const defaultConfig = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('autoprefixer')
  ]
};

module.exports = {
  defaultConfig
};
