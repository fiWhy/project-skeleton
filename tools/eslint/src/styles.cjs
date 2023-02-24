/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss'],
  rules: {
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'off'
  }
};
