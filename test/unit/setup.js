import '@babel/polyfill'
import Vue from 'vue'
import { config } from '@vue/test-utils'

Vue.config.productionTip = false

// IMPORTANT: DO NOT use vue-test-utils transitionStub
config.stubs.transition =
config.stubs['transition-group'] =
false
