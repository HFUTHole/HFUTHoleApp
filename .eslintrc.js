module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
    'react-native',
    'react-hooks',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*'],
      rules: {
        curly: [2, 'all'],
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        'no-useless-return': 'off',
        'prefer-const': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off', // If open this, it will create some unexpected errors
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/brace-style': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'new-cap': 'off',
        'react/jsx-key': 'error',
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        "prettier/prettier": [
          "error",
          {
            "endOfLine": "auto"
          },
        ],
      },
    },
  ],
}