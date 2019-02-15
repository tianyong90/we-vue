import { mount } from '@vue/test-utils'
import Area from '@/components/area'
import { slowVerticalDrag } from '../utils'

describe('datetime-picker', () => {
  let wrapper

  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Area)

    expect(wrapper.name()).toBe('wv-area')
  })
})
