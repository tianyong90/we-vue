module.exports = {
  name: 'we-vue',
  displayName: 'we-vue',
  verbose: false,
  roots: ['<rootDir>/src', '<rootDir>/test/unit'],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  testURL: 'http://localhost/',
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!weui)'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!**/*.d.ts', '!**/__test__/area.js'],
  globals: {
    __WE_VUE_VERSION__: '3.0.0', // version variable
  },
}
