module.exports = {
  root: false,
  parserOptions: {
    parser: 'typescript-eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  env: {
    es6: true,
    browser: true
  },
  // required to lint *.vue files
  plugins: [
    'typescript',
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
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      // TODO
      // 'registeredComponentsOnly': true,
      'ignores': []
    }],
    'comma-dangle': ['warn', 'always-multiline'],
  },
  overrides: [
    {
      files: '**/*.ts',
      rules: {
        'no-undef': 'off',
        'space-infix-ops': 'off',
        'import/export': 'off',
        'no-unused-vars': 'off',
        'no-inner-declarations': 'off',
        'no-redeclare': 'off', // TODO
        'typescript/adjacent-overload-signatures': 'error',
        'typescript/member-delimiter-style': ['error', {
          delimiter: 'none'
        }],
        'typescript/member-ordering': 'error',
        'typescript/type-annotation-spacing': 'error'
      }
    }
  ]
}
