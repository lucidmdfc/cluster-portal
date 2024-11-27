import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser', // Use TypeScript parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
  },
  ...compat.extends('standard-with-typescript'),
  pluginReactConfig,
  {
    plugins: ['@typescript-eslint'], // Add TypeScript plugin
    rules: {
      '@typescript-eslint/lines-between-class-members': 'error',
      '@typescript-eslint/no-throw-literal': 'error',
    },
  },
];
