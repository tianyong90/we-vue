// polyfill 是必要的，否则使用 async 函数会报错
// 也可以考虑对于测试使用 transform-runtime
import '@babel/polyfill'
import Vue from 'vue'
import { config } from '@vue/test-utils'

Vue.config.silent = true

// IMPORTANT: DO NOT use vue-test-utils transitionStub
;(config.stubs as any)['transition'] = false
;(config.stubs as any)['transition-group'] = false
