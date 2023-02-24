/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@dot-tools/eslint/react'),
    require.resolve('@dot-tools/eslint/styles'),
    require.resolve('@dot-tools/eslint/react-query')
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
};
