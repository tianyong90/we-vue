import { mount } from '@vue/test-utils'
import WAreaPicker from '../WAreaPicker'
// import { slowVerticalDrag } from '@/test/unit/utils'

describe('area picker', () => {
  test('create', () => {
    const wrapper = mount(WAreaPicker)

    expect(wrapper.name()).toBe('w-area-picker')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
