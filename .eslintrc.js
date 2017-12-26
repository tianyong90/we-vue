// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'plugin:vue/strongly-recommended',
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/jsx-uses-vars': 2,
    'vue/require-v-for-key': 0,
    "vue/require-default-prop": 0,
    "vue/name-property-casing": 0,
    "vue/no-unused-vars": 0,
    'vue/max-attributes-per-line': [2, {
      "singleline": 5,
      "multiline": {
        "max": 5,
        "allowFirstLine": false
      }
    }]
  }
}
