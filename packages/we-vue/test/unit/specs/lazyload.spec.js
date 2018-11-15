import { createLocalVue } from '@vue/test-utils'
import Lazyload from '@/lazyload'

describe('lazyload', () => {
  test('lazyload type', () => {
    expect(typeof Lazyload).toBe('object')
  })
})
