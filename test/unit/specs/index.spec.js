import { createLocalVue } from 'vue-test-utils'
import WeVue from '@/index.js'

describe('install', () => {
  const localVue = createLocalVue()

  localVue.use(WeVue)

  expect(typeof localVue.$dialog).toBe('function')
  expect(typeof localVue.$toast).toBe('function')
  expect(typeof localVue.$indicator).toBe('object')
  expect(typeof localVue.$toptips).toBe('object')
})
