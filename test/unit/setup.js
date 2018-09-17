import '@babel/polyfill'
import Vue from 'vue'
import { config } from '@vue/test-utils'

Vue.config.silent = true

// IMPORTANT: DO NOT use vue-test-utils transitionStub
config.stubs.transition = false
config.stubs['transition-group'] = false
