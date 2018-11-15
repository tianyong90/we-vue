import { createLocalVue } from '@vue/test-utils'
import WeVue from '@/index'

describe('index', () => {
  test('WeVue should be instaled in index.js', () => {
    const localVue = createLocalVue()

    localVue.use(WeVue)
  })
})
