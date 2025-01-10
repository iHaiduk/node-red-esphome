import eslint from '@eslint/js';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  { ignores: ['node_modules', 'dist', '.idea', '.git', 'builder'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginImport.flatConfigs.typescript,
  eslintPluginReact.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  stylistic.configs['recommended-flat'],

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    settings: { react: { version: 'detect' } },
    plugins: { react: eslintPluginReact },
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      'react/display-name': 0,
      'react/react-in-jsx-scope': 0,

      'react/jsx-max-props-per-line': [1, {
        maximum: 1,
        when: 'multiline',
      }],
      'react/jsx-first-prop-new-line': [1, 'multiline-multiprop'],
      'react/jsx-sort-props': [
        1,
        {
          multiline: 'last',
          callbacksLast: true,
          shorthandLast: true,
          reservedFirst: ['key'],
        },
      ],
      'react/no-multi-comp': 1,

      'react/jsx-fragments': 2,
      'react/style-prop-object': 2,
      'react/prefer-read-only-props': 2,
      'react/no-this-in-sfc': 2,
      'react/no-array-index-key': 2,
      'react/no-adjacent-inline-elements': 2,
      'react/no-invalid-html-attribute': 2,
      'react/jsx-props-no-spread-multi': 2,
      'react/jsx-pascal-case': 2,
      'react/jsx-no-useless-fragment': 2,
      'react/jsx-no-bind': 2,
      'react/jsx-handler-names': 2,
      'react/jsx-boolean-value': 2,
      'react/forbid-component-props': 2,

      'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-curly-brace-presence': [2, {
        props: 'never',
        children: 'never',
      }],
    },
    // ... others are omitted for brevity
  },

  {
    files: ['**/*.{ts,tsx}'],

    // This is required, see the docs
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      ...tseslint.configs.recommendedTypeChecked.at(2).rules,
      'import/no-unresolved': 0,
      'no-case-declarations': 0,
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/no-array-delete': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-this-alias': 0,
      '@typescript-eslint/no-unnecessary-condition': 0,

      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unsafe-assignment': 1,

      'import/no-self-import': 2,
      'import/no-import-module-exports': 2,
      'import/no-deprecated': 2,
      'import/newline-after-import': 2,
      'import/no-relative-packages': 2,
      'import/no-empty-named-blocks': 2,
      'import/no-absolute-path': 2,
      'import/first': 2,
      'import/exports-last': 2,

      'import/consistent-type-specifier-style': [2, 'prefer-inline'],
      'import/order': ['error', {
        alphabetize: { order: 'asc' },
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always-and-inside-groups',
      }],

      '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: 'React' }],
      '@typescript-eslint/adjacent-overload-signatures': 2,
      '@typescript-eslint/array-type': 2,
      '@typescript-eslint/class-literal-property-style': 2,
      '@typescript-eslint/consistent-indexed-object-style': 2,
      '@typescript-eslint/unified-signatures': 2,
      '@typescript-eslint/return-await': 2,

      '@typescript-eslint/no-mixed-enums': 2,
      '@typescript-eslint/no-confusing-non-null-assertion': 2,
      '@typescript-eslint/no-deprecated': 2,
      '@typescript-eslint/no-non-null-assertion': 2,
      '@typescript-eslint/no-dynamic-delete': 2,
      '@typescript-eslint/no-inferrable-types': 2,
      '@typescript-eslint/non-nullable-type-assertion-style': 2,

      '@typescript-eslint/prefer-find': 2,
      '@typescript-eslint/prefer-function-type': 2,
      '@typescript-eslint/prefer-includes': 2,
      '@typescript-eslint/prefer-literal-enum-member': 2,
      '@typescript-eslint/prefer-nullish-coalescing': 2,
      '@typescript-eslint/prefer-reduce-type-parameter': 2,
      '@typescript-eslint/prefer-regexp-exec': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
          // suffix: ['Class', 'Element', ''],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          suffix: ['Type', 'Props', 'Properties'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          suffix: ['Enum', 'Selector'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          suffix: ['Interface', 'Props', 'Properties'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeParameter',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'parameter',
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '(Icon|Component|testID|RED)$',
            match: false,
          },
        },
      ],
    },
  },

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],

    plugins: { '@stylistic': stylistic },

    rules: {
      '@stylistic/indent': ['error', 2],

      '@stylistic/semi': [2, 'always'],
      '@stylistic/padded-blocks': [2, 'never'],
      '@stylistic/object-curly-newline': [2, { multiline: true }],
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/quote-props': [2, 'as-needed'],
      '@stylistic/newline-per-chained-call': [2, { ignoreChainWithDepth: 2 }],
      '@stylistic/object-property-newline': 2,
      '@stylistic/max-len': [2, { code: 120 }],
      '@stylistic/no-multiple-empty-lines': [2, {
        max: 1,
        maxBOF: 0,
      }],
      '@stylistic/no-whitespace-before-property': 2,
      '@stylistic/space-before-blocks': 2,
      '@stylistic/space-before-function-paren': [2, 'never'],
      '@stylistic/space-infix-ops': 2,
      '@stylistic/comma-dangle': ['error', 'always-multiline'],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'export',
        },
      ],
    },
  },

  {
    languageOptions: { globals: globals.builtin },
    plugins: { unicorn: eslintPluginUnicorn },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,

      'unicorn/prevent-abbreviations': 0,
      'unicorn/no-anonymous-default-export': 0,
    },
  },
);
