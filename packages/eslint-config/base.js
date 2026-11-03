import eslint from '@eslint/js'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export const base = defineConfig(
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/routeTree.gen.ts'],
  },
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
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{d.ts,d.js}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
)
