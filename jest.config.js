module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test/unit'
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'vue'
  ],
  testURL: 'http://localhost/',
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/test$': '<rootDir>/test/index.js',
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    // TODO
    // '\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!weui)'
  ],
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts'
  ],
  globals: {
    'ts-jest': {
      'useBabelrc': true
    }
  }
}
