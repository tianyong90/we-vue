import { mount } from '@vue/test-utils'
import WSwipe from '../../WSwipe'
import WSwipeItem from '../WSwipeItem'

describe('swipe item', () => {
  test('create', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      slots: {
        default: [WSwipeItem, WSwipeItem],
      },
    })

    expect(wrapper.findAll(WSwipeItem)).toHaveLength(2)
    expect(wrapper.find(WSwipeItem).classes()).toContain('wv-swipe-item')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('destroyed', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      slots: {
        default: [WSwipeItem, WSwipeItem],
      },
    })

    wrapper.findAll(WSwipeItem).at(0).vm.$destroy()
    expect(wrapper.vm.swipes).toHaveLength(1)
  })
})
