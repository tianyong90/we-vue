import { mount, shallowMount } from '@vue/test-utils'
import Swipe from '@/components/swipe'
import SwipeItem from '@/components/swipe-item'

describe('swipe', () => {
  let parentWrapper
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
    parentWrapper && parentWrapper.destroy()
  })

  test('create', () => {
    parentWrapper = mount(Swipe, {
      propsData: {}
    })

    wrapper = shallowMount(SwipeItem, {
      parent: parentWrapper.vm
    })

    expect(wrapper.name()).toBe('wv-swipe-item')
    expect(wrapper.classes()).toContain('wv-swipe-item')
  })
})
