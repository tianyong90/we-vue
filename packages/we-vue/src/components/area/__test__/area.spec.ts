import { mount } from '@vue/test-utils'
import Area from '../area'
import { slowVerticalDrag } from '@/test/unit/utils'

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
