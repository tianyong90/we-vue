import Vue from 'vue'
import expect from 'expect'
import VueTestUtils from 'vue-test-utils'

Vue.config.productionTip = false

// IMPORTANT: DO NOT use vue-test-utils transitionStub
VueTestUtils.config.stubs.transition = false

global.expect = expect

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!index(\.js)?$)/)
srcContext.keys().forEach(srcContext)
