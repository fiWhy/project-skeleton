/** @type {import('prettier').RequiredOptions} */
module.exports = {
  ...require('./core.cjs'),
  plugins: [require('prettier-plugin-tailwindcss')]
};
