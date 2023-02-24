/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve('@dot-tools/eslint/core')],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    '@cspell/spellchecker': 'off'
  }
};
