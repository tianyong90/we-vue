module.exports = {
  name: 'we-vue',
  displayName: 'we-vue',
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
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!weui)'
  ],
  transform: {
    '\\.(scss)$': 'jest-css-modules',
    '^.+\\.(j|t)s$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts',
    '!**/gulpfile.js',
  ],
  globals: {
    // TODO: ts-jest 配置
    // 'ts-jest': {
    //   'babelConfig': true
    // },
    __WE_VUE_VERSION__: '3.0.0', // version variable
  }
}
