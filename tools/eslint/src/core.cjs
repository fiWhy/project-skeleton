/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:jsdoc/recommended'
  ],
  settings: {
    jsdoc: {
      ignoreInternal: true,
      ignorePrivate: true
    }
  },
  overrides: [
    {
      files: '*.cjs',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@cspell', 'jsdoc'],
  rules: {
    '@cspell/spellchecker': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/semi': 'off',
    semi: 'off',
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          FunctionExpression: true,
          FunctionDeclaration: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          ClassExpression: true,
          MethodDefinition: true
        },
        fixerMessage: ' @fixme - Missing JSDoc',
        publicOnly: true
      }
    ],
    'jsdoc/require-hyphen-before-param-description': [
      'error',
      'always',
      { tags: { property: 'always', returns: 'never' } }
    ],
    'jsdoc/match-description': [
      'error',
      {
        matchDescription: '[A-Z].*\\.',
        tags: {
          param: '[A-Z].*\\.',
          returns: '[A-Z].*\\.'
        }
      }
    ],
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-description': 'error',
    'jsdoc/require-returns': 'error',
    'jsdoc/check-line-alignment': 'error'
  }
};
