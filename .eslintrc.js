module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {}
    }
  },
  ignorePatterns: ['*.stories.tsx'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'warn',
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-default-export': 0,
    'import/no-anonymous-default-export': 0,
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    'react-hooks/exhaustive-deps': 0
  }
}
