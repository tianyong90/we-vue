import { shallow } from 'vue-test-utils'
import Grid from '@/components/grid'

describe('grid', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Grid, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-grid')
    expect(wrapper.classes()).toContain('weui-grids')
  })
})
