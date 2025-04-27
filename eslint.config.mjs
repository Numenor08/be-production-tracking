import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
    { ignores: ['dist/'] },
    {
        ignores: ['eslint.config.js'],
    },
    { files: ['src/**/*/{js,ts,jsx,tsx}', 'test/**/*.{js,ts,jsx,tsx}'] },
    {
        files: ['src/**/*.{js,mjs,cjs,ts}'],
        languageOptions: { globals: globals.node },
    },
    {
        files: ['src/**/*.{js,mjs,cjs,ts}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    tseslint.configs.recommended,
    {
        files: ['test/**/*.{js,ts,jsx,tsx}'],
        ...jest.configs['flat/recommended'],
        rules: {
            ...jest.configs['flat/recommended'].rules,
            'jest/prefer-expect-assertions': 'off',
        },
    },
    eslintPluginPrettierRecommended,
])
