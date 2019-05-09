module.exports = {
  root: false,
  globals: {
    '__WE_VUE_VERSION__': true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended',
    'plugin:jest/recommended'
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
    'jest/globals': true
  },
  // required to lint *.vue files
  plugins: [
    'jest',
    '@typescript-eslint',
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-vars': 'off',
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 5,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/require-prop-types': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'jest/no-large-snapshots': 'warn',
    'jest/prefer-spy-on': 'warn',
    'jest/prefer-to-be-null': 'warn',
    'jest/prefer-to-be-undefined': 'warn',
    'jest/prefer-to-contain': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect-in-promise': 'off', // TODO: 后期移除此条并优化相关测试代码
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/export': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none'
          },
          singleline: {
            delimiter: 'comma'
          }
        }],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      }
    }
  ]
}
