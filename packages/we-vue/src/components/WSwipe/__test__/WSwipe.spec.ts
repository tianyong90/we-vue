import { mount } from '@vue/test-utils'
import WSwipe from '../WSwipe'
import WSwipeItem from '../../WSwipeItem'
import { dragAndHoldHelper, horizontalDrag, verticalDrag } from '@/test/unit/utils'
import faker from 'faker'

describe('swipe', () => {
  test('create', () => {
    const wrapper = mount(WSwipe, {
      propsData: {},
    })

    expect(wrapper.name()).toBe('w-swipe')
    expect(wrapper.classes()).toContain('wv-swipe')

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('create with single swipe-item', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
      },
      slots: {
        default: [WSwipeItem],
      },
    })

    expect(wrapper.findAll(WSwipeItem)).toHaveLength(1)
    expect(wrapper.vm.count).toBe(1)
  })

  test('create with swipe-items', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        showIndicators: true,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    expect(wrapper.vm.count).toBe(3)
    expect(wrapper.vm.activeIndicator).toBe(0)
  })

  test('drag to right', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    const swipeWrapperItem = wrapper.find('.wv-swipe__wrapper')

    horizontalDrag(swipeWrapperItem, 0, 100)
    expect(wrapper.vm.active).toBe(-1)
    horizontalDrag(swipeWrapperItem, 0, 100)
    expect(wrapper.vm.active).toBe(1)
    horizontalDrag(swipeWrapperItem, 0, 100)
    expect(wrapper.vm.active).toBe(0)
  })

  test('drag to left', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    const swipeWrapperItem = wrapper.find('.wv-swipe__wrapper')

    horizontalDrag(swipeWrapperItem, 0, -100)
    expect(wrapper.vm.active).toBe(1)
    horizontalDrag(swipeWrapperItem, 0, -100)
    expect(wrapper.vm.active).toBe(2)
    horizontalDrag(swipeWrapperItem, 0, -100)
    expect(wrapper.vm.active).toBe(3)
    horizontalDrag(swipeWrapperItem, 0, -100)
    expect(wrapper.vm.active).toBe(1)
  })

  test('drag single slide while noDragWhenSingle is true', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
      },
      slots: {
        default: [WSwipeItem],
      },
    })

    const distance = faker.random.number()

    dragAndHoldHelper(wrapper, distance, 0)
    expect(wrapper.vm.offset).toBe(0)

    horizontalDrag(wrapper, 0, distance)
    expect(wrapper.vm.offset).toBe(0)
  })

  test('change swipes', () => {
    const initializeSpy = jest.fn()
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
      },
      methods: {
        initialize: initializeSpy,
      },
    })

    wrapper.setData({
      swipes: [],
    })

    expect(initializeSpy).toHaveBeenCalled()
  })

  test('change defaultIndex', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        defaultIndex: 1,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    expect(wrapper.vm.active).toBe(1)
  })

  test('autoplay', () => {
    jest.useFakeTimers()

    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        autoplay: 3000,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    jest.advanceTimersByTime(3030)
    expect(wrapper.vm.active).toBe(1)
    jest.advanceTimersByTime(3030)
    expect(wrapper.vm.active).toBe(2)
    jest.advanceTimersByTime(3030)
    expect(wrapper.vm.active).toBe(3)
    jest.advanceTimersByTime(3030)
    expect(wrapper.vm.active).toBe(1)

    jest.clearAllTimers()
  })

  test('preventScroll', () => {
    const wrapper = mount(WSwipe, {
      attachToDocument: true,
      propsData: {
        height: 120,
        prevent: true,
      },
      slots: {
        default: [WSwipeItem, WSwipeItem, WSwipeItem],
      },
    })

    verticalDrag(wrapper, 0, 100)
  })
})
