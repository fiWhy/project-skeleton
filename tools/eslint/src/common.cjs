/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:sort/recommended'
  ],
  overrides: [
    {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'readonly',
        require: 'readonly'
      },
      files: '*.cjs',
      env: {
        commonjs: true
      },
      rules: {
        'import/no-commonjs': 'off',
        'import/unambiguous': 'off',
        'unicorn/prefer-module': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['sort'],
  rules: {
    'sort/imports': 'error',
    'sort/object-properties': 'error'
  }
};
