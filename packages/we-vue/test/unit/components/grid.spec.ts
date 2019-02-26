import { shallowMount } from '@vue/test-utils'
import Grid from '../grid'

describe('grid', () => {
  test('create', () => {
    const wrapper = shallowMount(Grid, {
      propsData: {},
    })

    expect(wrapper.classes()).toContain('weui-grids')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
