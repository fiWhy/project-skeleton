/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  overrides: [
    {
      files: '*.tsx',
      rules: {
        'jsdoc/require-param': 'off',
        'jsdoc/require-returns': 'off',
        'react/prop-types': 'off'
      }
    },
    {
      files: '*.stories.tsx',
      rules: {
        'jsdoc/require-jsdoc': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-handler-names': 'error'
  }
};
