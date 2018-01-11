import { mount, shallow } from '@vue/test-utils'
import Swipe from '@/components/swipe'
import SwipeItem from '@/components/swipe-item'

describe('swipe', () => {
  let parentWrapper
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
    parentWrapper && parentWrapper.destroy()
  })

  it('create', () => {
    parentWrapper = mount(Swipe, {
      propsData: {}
    })

    wrapper = shallow(SwipeItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.name()).toBe('wv-swipe-item')
    expect(wrapper.classes()).toContain('wv-swipe-item')
  })
})
