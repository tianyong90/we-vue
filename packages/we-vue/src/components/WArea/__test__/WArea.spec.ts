import { mount } from '@vue/test-utils'
import Area from '../WArea'
// import { slowVerticalDrag } from '@/test/unit/utils'

describe('area picker', () => {
  test('create', () => {
    const wrapper = mount(Area)

    expect(wrapper.name()).toBe('wv-area')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
