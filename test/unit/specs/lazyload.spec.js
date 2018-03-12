import { createLocalVue } from '@vue/test-utils'
import Lazyload from '@/components/lazyload'

describe('lazyload', () => {
  it('lazyload type', () => {
    expect(typeof Lazyload).toBe('object')
  })
})
