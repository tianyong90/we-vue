import { mount } from '@vue/test-utils'
import Swipe from '@/components/swipe'
import SwipeItem from '@/components/swipe-item'

describe('swipe item', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  test('create', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      slots: {
        default: [SwipeItem, SwipeItem]
      }
    })

    expect(wrapper.findAll(SwipeItem).length).toBe(2)
    expect(wrapper.find(SwipeItem).classes()).toContain('wv-swipe-item')
  })
})
