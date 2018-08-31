require('@babel/polyfill')
import Vue from 'vue'
import VueTestUtils from '@vue/test-utils'

Vue.config.productionTip = false

// IMPORTANT: DO NOT use vue-test-utils transitionStub
VueTestUtils.config.stubs.transition =
false
