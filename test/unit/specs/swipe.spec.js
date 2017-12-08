import { mount } from 'vue-test-utils'
import Swipe from '@/components/swipe'

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
    expect(wrapper.hasClass('wv-swipe')).toBeTruthy()
  })

  // it('watch index', () => {
  //   wrapper = mount(Swipe, {
  //     propsData: {}
  //   })
  //
  //   wrapper.setData({
  //     index: 1
  //   })
  //
  //   expect(wrapper.emitted().change).toBeTruthy()
  // })
})
