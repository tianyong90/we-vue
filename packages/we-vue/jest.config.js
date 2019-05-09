module.exports = {
  name: 'we-vue',
  displayName: 'we-vue',
  verbose: false,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-fourteen',
  roots: [
    '<rootDir>/src',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
    'vue',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.+\\.(css|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(j|t)sx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts',
    '!**/__test__/area.js',
  ],
  testMatch: [
    // Default
    '**/test/**/*.js',
    '**/__test__/**/*.spec.js',
    '**/__test__/**/*.spec.ts'
  ],
  globals: {
    __WE_VUE_VERSION__: '3.0.0', // version variable
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
    }
  },
}
