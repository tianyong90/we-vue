import { mount } from 'vue-test-utils'
import Swipe from '@/components/swipe'
import SwipeItem from '@/components/swipe-item'
import { dragHelper } from '../utils'

describe('swipe', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = mount(Swipe, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-swipe')
    expect(wrapper.classes()).toContain('wv-swipe')
  })

  it('create with swipe-items', () => {
    wrapper = mount(Swipe, {
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    expect(wrapper.findAll(SwipeItem).length).toBe(3)
  })

  // TODO
  it('swipe left and right', () => {
    wrapper = mount(Swipe, {
      propsData: {},
      slots: {
        default: [SwipeItem, SwipeItem, SwipeItem]
      }
    })

    // swipe to right
    dragHelper(wrapper.find('.wv-swipe__wrapper'), 30, 0)

    expect(wrapper.findAll(SwipeItem).length).toBe(3)
  })
})
