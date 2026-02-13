import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

// Constants for file patterns to ensure consistency
const TS_FILES = ['**/*.ts']
const TS_IGNORES = ['*.config.ts', 'dist/**', 'node_modules/**', 'src/example.ts']

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Prettier config to disable conflicting rules
  prettierConfig,

  // TypeScript files WITH type checking
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: TS_FILES,
    ignores: TS_IGNORES,
  })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({
    ...config,
    files: TS_FILES,
    ignores: TS_IGNORES,
  })),

  // Custom rules for TypeScript files
  {
    files: TS_FILES,
    ignores: TS_IGNORES,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-var-requires': 'warn', // Allow require for dynamic imports

      // General code quality rules
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }], // Allow console.log for CLI output
      'no-debugger': 'warn', // Allow debugger for development/debugging
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'linebreak-style': ['error', 'unix'],

      // Complexity limits
      complexity: ['warn', { max: 15 }], // Reporter logic can be complex
      'max-depth': ['warn', { max: 4 }],
      'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', { max: 5 }],

      // Code smell prevention
      'no-duplicate-imports': 'error',
      'no-return-await': 'off', // Disabled to avoid conflict
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      'consistent-return': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-nested-ternary': 'warn',
      'prefer-template': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Test-specific allowances
      '@typescript-eslint/no-non-null-assertion': 'off', // Useful in test assertions
    },
  },

  // Config files - Node.js environment
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'test-results/**',
      '*.html',
      'package-lock.json',
    ],
  },
]
