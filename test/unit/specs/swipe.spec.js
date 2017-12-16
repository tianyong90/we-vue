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

  it('create with single swipe-item', () => {
    wrapper = mount(Swipe, {
      attachToDocument: true,
      propsData: {
        height: 120
      },
      slots: {
        default: [SwipeItem]
      }
    })

    expect(wrapper.findAll(SwipeItem).length).toBe(1)
    expect(wrapper.vm.count).toBe(1)
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
    // wrapper = mount(Swipe, {
    //   attachToDocument: true,
    //   propsData: {
    //     height: 100
    //   },
    //   slots: {
    //     default: [SwipeItem, SwipeItem, SwipeItem]
    //   }
    // })
    //
    // setTimeout(() => {
    //   wrapper.find('.wv-swipe__wrapper').trigger('touchstart')
    //   dragHelper(wrapper.find('.wv-swipe__wrapper'), 100, 0)
    // }, 1000)

    // swipe to right
    // dragHelper(wrapper, 100, 0)
    // dragHelper(wrapper.find('.wv-swipe__wrapper'), 100, 0)
  })
})
