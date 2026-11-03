import css from '@eslint/css'
import eslint from '@eslint/js'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      '**/routeTree.gen.ts',
      '**/*.config.js',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },
  ...tanstackConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [eslint.configs.recommended],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: tseslint.configs.recommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintPluginUnicorn.configs.recommended,
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css },
    rules: {
      ...css.configs.recommended.rules,
      'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
      'css/no-important': 'warn',
      'css/use-baseline': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'import/order': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'warn',
      'unicorn/switch-case-braces': 'off',
      'unicorn/no-nested-ternary': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.{d.ts,d.js}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/routeTree.gen.ts'],
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    rules: {
      'unicorn/no-abusive-eslint-disable': 'off',
    },
  },
)
