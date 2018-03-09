import { createLocalVue } from '@vue/test-utils'
import WeVue from '@/index.js'

describe('index', () => {
  it('WeVue should be instaled in index.js', () => {
    const localVue = createLocalVue()

    localVue.use(WeVue)

    expect(typeof localVue.$dialog).toBe('function')
    expect(typeof localVue.$toast).toBe('function')
    expect(typeof localVue.$toptips).toBe('function')
  })
})
