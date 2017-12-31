// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/require-default-prop": 'off',
    "vue/no-unused-vars": 'off',
    "vue/name-property-casing": ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }]
  }
}
