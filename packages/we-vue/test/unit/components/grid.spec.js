import { shallowMount } from '@vue/test-utils'
import Grid from '@/components/grid'

describe('grid', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = shallowMount(Grid, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('wv-grid')
    expect(wrapper.classes()).toContain('weui-grids')
  })
})
