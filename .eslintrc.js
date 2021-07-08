module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-native',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-param-reassign': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-unused-vars': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'arrow-parens': 0,
    'react/no-children-prop': 0,
    'react/jsx-props-no-spreading': 0,
    semi: 0,
    'no-throw-literal': 0,
    'prefer-promise-reject-errors': 0,
    yoda: 0,
    'max-len': [2, 120],
    'react/prop-types': 0,
  },
};
